const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    patronymic: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, unique: true },
    avatar: { type: String },
    roles: { type: Array, default: ["student"] }, // admin  ?  user
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
