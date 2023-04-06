let express = require('express');
let router = express.Router();

const loginUserController = require('../../controllers/userController/login.controller');
router.get("/",loginUserController.loginUser);

module.exports = router;