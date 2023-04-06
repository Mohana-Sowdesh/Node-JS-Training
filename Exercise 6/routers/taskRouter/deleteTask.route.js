let express = require('express');
let router = express.Router();

const deleteTaskController = require('../../controllers/taskController/deleteTask.controller');
router.delete("/:id",deleteTaskController.deleteTask);

module.exports = router;