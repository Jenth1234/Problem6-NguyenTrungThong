const userService = require("../services/user/userService");
const bcrypt = require('bcrypt');
const { registerSchema, loginSchema } = require('../models/user/validate/index'); // Ensure the path is correct

class UserController {

  async registerUser(req, res) {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: { general: error.details[0].message } });
    }

    try {
      const payload = req.body;
      await userService.registerUser(payload);
      return res.status(201).json({ message: "Registration successful" });
    } catch (err) {
      return res.status(500).json({ errors: { general: "User registration failed: " + err.message } });
    }
  }

  async login(req, res) {

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: { general: error.details[0].message } });
    }

    try {
      const { USERNAME, PASSWORD } = req.body;
      const existingUser = await userService.getUserByUsername(USERNAME);
      if (!existingUser) {
        return res.status(401).json({ errors: { general: "Invalid username or password" } });
      }

      const isMatch = await bcrypt.compare(PASSWORD, existingUser.PASSWORD);
      if (!isMatch) {
        return res.status(401).json({ errors: { general: "Invalid username or password" } });
      }
      const token = await userService.generateToken(existingUser._id);
      return res.status(200).json({
        message: "Login successful",
        token
      });
    } catch (error) {
      return res.status(500).json({ errors: { general: "Login failed: " + error.message } });
    }
  }
}

module.exports = new UserController();
