const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
router.post('/register',userController.registerUser);
// router.post('/updateUser/:id',userController.updateUser);
// router.post('/getUser/:id',userController.getUser)
// router.post('/listGender', userController.listGender);
// router.post('/delete/:id', userController.deleteUser);
router.post('/login', userController.login);
module.exports = router;