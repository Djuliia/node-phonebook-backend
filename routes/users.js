const express = require("express");
const { signupUserSchema, loginSchema } = require("../schemas/user-schemas");
const validateBody = require("../decorators/validateBody");
const {
  signup,
  login,
  logout,
  current,
} = require("../controllers/users-controller");
const authenticate = require("../midlewares/authenticate");

const userRouter = express.Router();

userRouter.post("/signup", validateBody(signupUserSchema), signup);
userRouter.post("/login", validateBody(loginSchema), login);
userRouter.post("/logout", authenticate, logout);
userRouter.get("/current", authenticate, current);

module.exports = userRouter;
