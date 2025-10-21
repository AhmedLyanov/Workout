const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    avatar: {type: String},
    email: {type:String, unique: true, required: true },
    firstName: {type: String},
    roles: {type:Array, default: ['student'], enum: ["student", "developer", "admin"]},
    phoneNumber: {type: Number, unique: true,}
}, {timestamps: true})


module.exports = model("User", UserSchema);