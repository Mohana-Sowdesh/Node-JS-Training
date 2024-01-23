const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

//Routing tasks
router.post("/", taskController.createTaskController);
router.delete("/:id", taskController.deleteTaskController);
router.get("/", taskController.readTasksController);
router.get("/:id", taskController.readTaskByIDController);
router.put("/:id", taskController.updateTaskController);

module.exports = router;