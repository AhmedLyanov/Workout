const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    avatar: {type: String},
    email: {type:String, unique: true, required: true },
    password: {type:String, required: true},
    firstName: {type: String, required: true},
    roles: {type:Array, default: ['student']},
    phoneNumber: {type: Number, unique: true,}
}, {timestamps: true})


module.exports = model("User", UserSchema);