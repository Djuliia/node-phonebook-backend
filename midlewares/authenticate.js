const jwt = require("jsonwebtoken");
const UserModel = require("../db/models/user-model");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    res.status(401).json({
      message: "Not authorized",
    });
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await UserModel.findById(id);

    if (!user || !user.token || token !== user.token) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = authenticate;
