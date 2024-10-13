const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token =
    req.cookies.jwt || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      mssg: "No, token, authoriztion denied",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log("the decoded user is :", req.user);
    next();
  } catch (err) {
    res.status(400).json({
      mssg: "token is invalid",
    });
  }
};

module.exports = verifyToken;
