let express = require('express');
let router = express.Router();

const sortTaskController = require('../../controllers/taskController/sortTask.controller');
router.get("/",sortTaskController.sortTask);

module.exports = router;