const mongoose = require("mongoose");

mongoose.connect("").then(() => { console.log("Connected to DB successfully") }).catch((err) => { console.log("Error connecting DB", err) });

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         lowercase: true,
//         unique: true,
//         trim: true,
//         minlength: 3,
//         maxlength: 30
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6
//     },
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 30
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 30
//     }
// }, {
//     timestamps: true
// });

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
})

const accountSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    balance: Number
})
const Users = mongoose.model("users", userSchema);
const Accounts = mongoose.model("accounts",accountSchema)

module.exports = {
    Users,
    Accounts
}
