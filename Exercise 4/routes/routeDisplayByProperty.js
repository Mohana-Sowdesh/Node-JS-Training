let express = require('express');
let router = express.Router();

let displayByPropertyController = require('../controllers/controlDisplayByProperty');
router.get("/:id", displayByPropertyController.displayByProperty);

module.exports = router;