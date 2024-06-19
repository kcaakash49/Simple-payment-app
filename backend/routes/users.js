const { Router } = require("express");
const zod = require("zod");
const { Users, Accounts } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middlewares");

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
});

const singInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.post("/signup", async (req, res) => {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            msg: "Wrong inputs",
        });
        return;
    }

    const findUser = await Users.findOne({ username: req.body.username });

    if (!findUser) {
        const user = await Users.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        const userId = user._id;
        
        await Accounts.create({
            userId: userId,
            balance:1 + Math.random()*1000
        })
        const token = jwt.sign({ userId }, JWT_SECRET); 
        
        res.status(200).json({
            message: "User Created successfully",
            token: token,
        });
    } else {
        res.status(400).json({
            msg: "User already exist",
        });
    }
});

router.get("/bulk", async (req, res) => {

    const allUsers = await Users.find({});
    res.status(200).json({ allUsers });
});

router.get("/search", async (req, res) => {
    const toFilter = req.query.filter;
    console.log(toFilter)


    if (!toFilter) {
        return res.status(411).json({
            msg: "Nothing to search"
        })
    }

    const user = await Users.find({
        //for exact match search
        // $or: [
        //     {firstName:toFilter},
        //     {lastName:toFilter}
        // ]

        // checks substring that matches the filter pattern, more powerful
        $or: [
            {
                firstName: {
                    "$regex": toFilter,
                    "$options": "i"
                }
            }, {
                lastName: {
                    "$regex": toFilter,
                    "$options": "i"
                }
            }
        ]
    })

    if (user.length === 0) {
        res.status(411).json({
            msg: "No user found"
        })
    } else {
        res.status(200).json({
            // user: user.map(user => ({
            //     username: user.username,
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     _id: user._id
            // }))
            user: user
        })
    }


});

router.post("/signin", async (req, res) => {
    const { success } = singInSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "Incorrect inputs",
        });
    }

    const username = req.body.username;
    const password = req.body.password;

    const user = await Users.findOne({ username, password });

    if (!user) {
        res.status(411).json({
            msg: "Username or password error",
        });
        return;
    }

    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({
        token: token,
    });
});

// router.put("/update", authMiddleware, async (req, res) => {
//     const { password, firstName, lastName } = req.body;
//     const userId = req.userId;

//     try {
//         const targetUser = await Users.findById(userId);
//         if (firstName) {
//             targetUser.firstName = firstName
//         }
//         if (lastName) {
//             targetUser.lastName = lastName;
//         }
//         if (password) {
//             targetUser.password = password;
//         }

//         await targetUser.save();
//         return res.status(200).json({ message: "updated Successfully" })
//     }catch{
//         return res.status(411).json({message:"Error while updating information"})
//     }

// })

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "Error while updating"
        })
    }

    await Users.updateOne({ _id: req.userId }, req.body);
    res.status(200).json({
        msg: "Update completed"
    })
})

module.exports = router;
