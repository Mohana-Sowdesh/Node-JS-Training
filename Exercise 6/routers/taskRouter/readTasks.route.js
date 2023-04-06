let express = require('express');
let router = express.Router();

const readTasksController = require('../../controllers/taskController/readTasks.controller');
router.get("/",readTasksController.readTasks);

module.exports = router;