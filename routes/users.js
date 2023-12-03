const express = require("express");
const { signupUserSchema } = require("../schemas/user-schemas");
const validateBody = require("../decorators/validateBody");
const { signup } = require("../controllers/users-controller");

const userRouter = express.Router();

userRouter.post("/signup", validateBody(signupUserSchema), signup);
userRouter.post("/login");
userRouter.post("/logout");
userRouter.get("/current");

module.exports = userRouter;
