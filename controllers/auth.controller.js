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

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if(!email || !password) {
        res.status(400).json({ message: "Не все поля заполнены" })
      }

      const user = await User.findOne({ email })
      if(!user) {
        res.status(400).json({ message: "Неправильная почта" })
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: "Непарвильный пароль" });
      }

      const token = generateToken(user);

      return res.status(201).json({ message: "Вы успешно вошли!", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка при входе" })
    }
  }
}

module.exports = new authController();
