let express = require('express');
let router = express.Router();

const userController = require('../controllers/user.controller');

router.post("/login", userController.loginController);
router.post("/register", userController.registerController);

module.exports = router;