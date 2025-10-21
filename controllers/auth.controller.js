const User = require("../models/User.model");
const bcrypt = require('bcrypt')

class authController {
  async registration(req, res) {
    try {
      const { email, firstName, phoneNumber, roles, } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "This user already exists!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, firstName, phoneNumber, });
      await user.save();

      const token = generateToken(user);
      return res.status(201).json({ message: user, token });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({
            message: "Validation failed",
            details: Object.values(error.errors).map((e) => e.message),
          });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
