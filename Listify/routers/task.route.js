let express = require('express');
let router = express.Router();

//Importing controllers
const createTaskController = require('../controllers/taskController/createTask.controller');
const deleteTaskController = require('../controllers/taskController/deleteTask.controller');
const filterTaskController = require('../controllers/taskController/filterTask.controller');
const readTaskByIDController = require('../controllers/taskController/readTaskByID.controller');
const readTasksController = require('../controllers/taskController/readTasks.controller');
const sortTaskController = require('../controllers/taskController/sortTask.controller');
const updateTaskController = require('../controllers/taskController/updateTask.controller');

//Routing tasks
router.post("/create", createTaskController.createTaskController);
router.delete("/:id", deleteTaskController.deleteTaskController);
router.get("/filterTask/:criteria", filterTaskController.filterTaskController);
router.get("/:id", readTaskByIDController.readTaskByIDController);
router.get("/tasks-list", readTasksController.readTasksController);
router.get("/sortTask", sortTaskController.sortTaskController);
router.put("/updateTask/:id", updateTaskController.updateTaskController);

module.exports = router;