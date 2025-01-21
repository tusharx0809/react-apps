require("dotenv").config();
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_JWT;

router.post(
  "/createEmployee",
  [
    body("empid", "Enter an Emplyee Id").isLength({ min: 5 }),
    body("name", "Enter employee name").isLength({ min: 3 }),
    body("password", "Enter password for employee").isLength({ min: 8 }),
    body("position", "Enter employee position").isLength({ min: 3 }),
    body("phone", "Enter phone number").isLength({ min: 10 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errors_arr = errors.array();
      const message = errors_arr[0].msg;
      return res.status(400).json({ success, error: message });
    }
    try {
      let employee = await Employee.findOne({ empdid: req.body.empid });
      if (employee) {
        return res.status(400).json({
          success,
          error:
            "An employee is already there with this emp id, try again with another!",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      employee = new Employee({
        empid: req.body.empid,
        name: req.body.name,
        password: secPassword,
        position: req.body.position,
        phone: req.body.phone,
      });

      await employee.save();

      const data = {
        user: {
          id: employee.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(200).json({
        success,
        authToken,
        message: `Employee with ID:${req.body.empid} created successfully!`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server error");
    }
  }
);

module.exports = router;
