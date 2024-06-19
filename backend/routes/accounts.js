const { Router } = require("express");
const authMiddleware = require("../middlewares");
const zod = require("zod");
const { Accounts, Users } = require("../db");
const { default: mongoose } = require("mongoose");

const router = Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const userId = req.userId;
    console.log(userId)
    const balance = await Accounts.findOne({ userId: userId });

    res.status(200).json({
        balance: balance.balance
    })

})
const transferSchema = zod.object({
    to: zod.string().email(),
    amount: zod.number()
})

//bad solution for transfer as it doesnot use transactions, if db crashes on debit then credit operation will not happen leading to db inconsistency
// router.post("/transfer",authMiddleware,async (req,res)=>{
//     const { success } = transferSchema.safeParse(req.body);
//     if(!success){
//         return res.status(400).json({
//             message:"Invalid inputs"
//         })
//     }
//     const toUser = await Users.findOne({username:req.body.to});
//     if (!toUser){
//         return res.status(400).json({
//             message:"invalid account"
//         })
//     }
//     const fromUserAccount = await Accounts.findOne({userId:req.userId})
//     const toUserAccount = await Accounts.findOne({userId:toUser._id});

//     if (fromUserAccount.balance < req.body.amount){
//         return res.status(400).json({
//             message:"insufficient balance"
//         })
//     }

//     await Accounts.findByIdAndUpdate(toUserAccount._id,{balance: toUserAccount.balance + req.body.amount})
//     await Accounts.findByIdAndUpdate(fromUserAccount._id,{balance: fromUserAccount.balance - req.body.amount})

//     res.status(400).json({
//         message:"Transfer Successful"
//     })

// })

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { to, amount } = req.body;

    const fromAccount = await Accounts.findOne({ userId: req.userId }).session(session);
    if (!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await Accounts.findOne({ userId: to }).session(session);
    console.log("To account", toAccount);

    if (!toAccount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            message: "invalid Account"
        })
    }

    await Accounts.updateOne(
        {
            userId: to
        }, {
        $inc: {
            balance: amount
        }
    }
    ).session(session)

    await Accounts.updateOne(
        {
            userId: req.userId
        }, {
        $inc: {
            balance: -amount
        }
    }
    ).session(session)

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
        message:"Transfer Successful"
    })

})



module.exports = router