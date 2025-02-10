const express = require("express");
const { identifyCustomer } = require("../controllers/identifyController");

const router = express.Router();
router.post("/", identifyCustomer);

module.exports = router;
