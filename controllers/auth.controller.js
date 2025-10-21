const User = require("../models/User.model");
const bcrypt = require('bcrypt')

class authController {
  async registration(req, res) {
    try {
      const { email, firstName, phoneNumber, password, roles, } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "This user already exists!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, firstName, phoneNumber, password: hashedPassword });
      await user.save();
      return res.status(201).json({ message: user});
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}


module.exports = new authController();