const express = require("express");
const customerServices = express.Router();
const customerController = require("./CustomerController");

customerServices.route("/address").post(customerController.saveCustomerAddress);
customerServices.route("/address").get(customerController.searchCustomerAddress);

module.exports = customerServices;