const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "8ER3FLQAergfeUIOUiWR3cNWVllBZ2BaFata8pkFnnQYsdCoBH";



module.exports = router;