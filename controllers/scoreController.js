const scoreService = require('../services/score/scoreService');

class ScoreController {
  async getTop10Users(req, res) {
    try {
      const topUsers = await scoreService.getTop10Users();
      return res.status(200).json({ data: topUsers });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve top users list' });
    }
  }

  async updateScore(req, res) {
    const payload = req.body;
    const userId = req.user_id;
    
    try {
      const updatedUser = await scoreService.updateUserScore(userId, { SCORE: 1 }, req.io);

      return res.status(200).json({
        message: 'Score has been updated',
        data: {
          USERID: updatedUser.USERID,
          // FULLNAME: updatedUser.FULLNAME,
          SCORE: updatedUser.SCORE
        }
      });
    } catch (error) {
      return res.status(500).send('Server error: ' + error.message);
    }
  }
}

module.exports = new ScoreController();
