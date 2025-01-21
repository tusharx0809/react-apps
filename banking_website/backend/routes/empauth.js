require("dotenv").config();
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_JWT;
const fetchemp = require("../middleware/fetchemp");
const sendEmail = require("../utils/sendEmail");

router.post(
  "/createEmployee",
  [
    body("empid", "Enter an Emplyee Id").isLength({ min: 5 }),
    body("name", "Enter employee name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
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
        email: req.body.email,
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
router.post(
  "/emplogin",
  [
    body("empid", "Enter Empid").notEmpty(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { empid, password } = req.body;
    try {
      const employee = await Employee.findOne({ empid: empid });
      if (!employee) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, employee.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const payload = {
        employee: {
          id: employee.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);

      const otp = employee.generateOTP();
      await employee.save();

      const message = `
            <h1> Employee Login</h1>
            <p> Your login OTP is <b>${otp}</b></p>
            <p>OTP Valid for 5 minutes</p>`;
      try {
        await sendEmail({
          email: employee.email,
          subject: "Employee Login",
          message,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        return res.status(500).json({
          error: "Failed to send verification email",
          details: emailError.message,
        });
      }
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server error");
    }
  }
);

router.put("/verifyEmpOtp", fetchemp, async (req, res) => {
  let success = false;
  try {
    const emp = await Employee.findById(req.employee.id).select("-password");
    if (!emp) {
      return res.status(400).json({ success, error: "Employee not found" });
    }
    const { otp } = req.body;
    if (emp.loginOTP !== otp || emp.loginOtpExp < Date.now()) {
      return res
        .status(400)
        .json({ success, error: "Invalid or expired OTP, please try again!" });
    }

    (emp.loginOTP = null), (emp.loginOtpExp = null), await emp.save();

    success = true;
    res.status(200).json({ success, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
});

router.get("/getEmp", fetchemp, async (req, res) => {
  let success = false;
  try {
    const emp = await Employee.findById(req.employee.id).select("-password");
    if (!emp) {
      return res.status(400).json({ success, error: "Employee not found" });
    }
    success = true;
    res.json({ success, emp });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
});

module.exports = router;
