let express = require('express');
let router = express.Router();

const filterTaskController = require('../../controllers/taskController/filterTask.controller');
router.get("/:criteria",filterTaskController.filterTask);

module.exports = router;