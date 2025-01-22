const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_JWT;

const fetchemp = (req, res, next) => {
  //get the user from jwt token and add id to req object
  const emptoken = req.header("empAuthToken");
  //console.log(token);
  if (!emptoken) {
    res
      .status(401)
      .send({
        error: "No token found",
      });
  }
  try {
    const data = jwt.verify(emptoken, JWT_SECRET);
    //console.log(data);
    req.employee = data.employee;

    next();
  } catch (error) {
    res
      .status(401) 
      .send({
        error: "Access Denied! Please authenticate using a valid token!",
      });
  }
  //async in routes will run after fetchuser wherever used.
};

module.exports = fetchemp;
