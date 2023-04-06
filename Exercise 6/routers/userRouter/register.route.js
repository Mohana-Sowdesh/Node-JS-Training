let express = require('express');
let router = express.Router();

const registerUserController = require('../../controllers/userController/register.controller');
router.get("/",registerUserController.registerUser);

module.exports = router;