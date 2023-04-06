let express = require('express');
let router = express.Router();

const readTaskByIDController = require('../../controllers/taskController/readTaskByID.controller');
router.get("/:id",readTaskByIDController.readTaskByID);

module.exports = router;