const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

function generateToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
}

class authController {
  async registration(req, res) {
    try {
      const { firstName, lastName, patronymic, email, password, phoneNumber } =
        req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ message: "This user already exists!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        firstName,
        lastName,
        patronymic,
        email,
        password: hashedPassword,
        phoneNumber,
      };
      if (req.file && req.file.filename) {
        newUser.avatar = req.file.filename;
      }

      const user = new User(newUser);
      const token = generateToken(user);
      await user.save();
      return res.status(201).json({ message: user, token });
    } catch (error) {
      console.error("Registration error:", error);
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // getRole

  async getUsersRolesAdmin(req, res){
    try{
      const adminUsers = await User.find({roles: "admin"});
      return res.status(200).json(adminUsers);
    }catch (error){
      return res.status(500).json({massage: "Ошибка получения пользователь с ролью admin"})
    }
  }

    async getUsersRolesUser(req, res){
    try{
      const userUsers = await User.find({roles: "user"});
      return res.status(200).json(userUsers);
    }catch (error){
      return res.status(500).json({massage: "Ошибка получения пользователь с ролью user"})
    }
  }

    async getUsersRolesStudent(req, res){
    try{
      const studentUsers = await User.find({roles: "student"});
      return res.status(200).json(studentUsers);
    }catch (error){
      return res.status(500).json({massage: "Ошибка получения пользователь с ролью student"})
    }
  }
  
}

module.exports = new authController();
