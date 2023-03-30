let express = require('express');
let router = express.Router();

let displayAllEmployeesController = require('../controllers/controlDisplayAllEmployees');
router.get("/", displayAllEmployeesController.displayAllEmployees);

module.exports = router;