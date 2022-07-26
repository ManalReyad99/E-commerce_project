const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  var { authorization } = req.headers;

  jwt.verify(authorization, "w6ef77fe7eew6f7ew67", function (err, decoded) {
    if (err) {
      return res.status(401).end();
    }

    next();
  });
};

module.exports = auth;
