let express = require('express');
let router = express.Router();

const createTaskController = require('../../controllers/taskController/createTask.controller');
router.post("/",createTaskController.createTask);

module.exports = router;