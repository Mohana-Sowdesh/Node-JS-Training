let express = require('express');
let router = express.Router();

const updateTaskController = require('../../controllers/taskController/updateTask.controller');
router.put("/:id",updateTaskController.updateTask);

module.exports = router;