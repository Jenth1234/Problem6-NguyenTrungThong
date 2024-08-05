const UserModel = require('../../models/user/userModel'); 
const ScoreModel = require('../../models/score/scoreModel');

class ScoreService {
  async updateUserScore(userId, payload, io) {
    try {
      const user = await UserModel.findById(userId);
    
      if (!user) {
        throw new Error('User does not exist');
      }
  
 
      console.log('User\'s full name:', user.FULLNAME);
  
     
      let scoreRecord = await ScoreModel.findOne({ USERID: userId });
      if (!scoreRecord) {
        scoreRecord = new ScoreModel({ USERID: userId, SCORE: 0, FULLNAME: user.FULLNAME }); // Ensure FULLNAME is provided
      } else {
  
        scoreRecord.FULLNAME = user.FULLNAME;
      }
  

      scoreRecord.SCORE = (scoreRecord.SCORE || 0) + payload.SCORE;
      await scoreRecord.save();
  
 
      const updatedUser = await ScoreModel.findOne({ USERID: userId }).populate('USERID', 'FULLNAME');
      io.emit('scoreUpdated', { 
        userId: updatedUser.USERID._id,
        fullName: updatedUser.USERID.FULLNAME,
        newScore: updatedUser.SCORE
      });
  
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating score: ' + error.message);
    }
  }


  async checkIdExists(userId) {
    try {
      const scoreRecord = await ScoreModel.findOne({ USERID: userId });
      return !!scoreRecord; 
    } catch (error) {
      throw new Error('Error checking user ID: ' + error.message);
    }
  }

  async getTop10Users() {
    try {

      const topUsers = await ScoreModel.find()
        .sort({ SCORE: -1 })
        .limit(10)
        .exec();
  
      // Return only FULLNAME and SCORE
      return topUsers.map(user => ({
        fullName: user.FULLNAME,
        score: user.SCORE
      }));
    } catch (error) {

      throw new Error('Error retrieving top 10 users');
    }
  }
}

module.exports = new ScoreService();
