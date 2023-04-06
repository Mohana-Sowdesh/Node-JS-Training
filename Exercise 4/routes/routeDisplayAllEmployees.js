let express = require('express');
let router = express.Router();

//Routing to displayAllEmployeesController
let displayAllEmployeesController = require('../controllers/controlDisplayAllEmployees');
router.get("/", displayAllEmployeesController.displayAllEmployees);

module.exports = router;