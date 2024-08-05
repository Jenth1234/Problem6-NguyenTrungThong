const userModel = require('../../models/user/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const SALT_ROUNDS = 10;

class UserService {
  async registerUser(payload) {
    try {
      const hashedPassword = await bcrypt.hash(payload.PASSWORD, SALT_ROUNDS);
      const newUser = new userModel({
        USERNAME: payload.USERNAME,
        PASSWORD: hashedPassword,
        FULLNAME: payload.FULLNAME,
        EMAIL: payload.EMAIL,
        ROLE: {
          IS_ADMIN: false,
        },
        GENDER: payload.GENDER,
      });

      const result = await newUser.save();
      return result._doc;
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }


  async getUserByUsername(username) {
    try {
      return await userModel.findOne({ USERNAME: username });
    } catch (error) {
      throw new Error('Failed to get user by username: ' + error.message);
    }
  }

  async login(payload) {
    try {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const expiresIn = '5h';
      const accessToken = jwt.sign(payload, secret, { expiresIn });
      return accessToken;
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  }

  async getUserInfo(userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to get user info: ' + error.message);
    }
  }

  async listUsersByGender(gender) {
    try {
      return await userModel.find({ GENDER: gender });
    } catch (error) {
      throw new Error('Error retrieving users by gender: ' + error.message);
    }
  }

  async deleteUserById(userId) {
    try {
      return await userModel.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }

  async updateUserById(userId, updates) {
    try {
      return await userModel.findByIdAndUpdate(userId, updates, { new: true });
    } catch (error) {
      throw new Error('Failed to update user: ' + error.message);
    }
  }

  async generateToken(userId) {
    try {
      return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    } catch (error) {
      throw new Error('Token generation failed: ' + error.message);
    }
  }

  async getTop10Users() {
    try {
      const topUsers = await userModel.find({})
        .sort({ score: -1 }) // Giả sử bạn có trường `score` để lưu điểm số
        .limit(10);

      return topUsers;
    } catch (error) {
      throw new Error('Error retrieving top 10 users: ' + error.message);
    }
  }
}

module.exports = new UserService();
