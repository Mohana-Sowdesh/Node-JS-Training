let express = require('express');
let router = express.Router();

const loginUserController = require('../controllers/userController/login.controller');
const registerUserController = require('../controllers/userController/register.controller');

router.get("/login",loginUserController.loginController);
router.post("/register",registerUserController.registerController);

module.exports = router;