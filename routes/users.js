const express = require("express");
const { signupUserSchema, loginSchema } = require("../schemas/user-schemas");
const validateBody = require("../decorators/validateBody");
const {
  signup,
  login,
  logout,
  current,
  updateAvatar,
} = require("../controllers/users-controller");
const authenticate = require("../midlewares/authenticate");
const upload = require("../midlewares/upload");

const userRouter = express.Router();

userRouter.post("/signup", validateBody(signupUserSchema), signup);
userRouter.post("/login", validateBody(loginSchema), login);
userRouter.post("/logout", authenticate, logout);
userRouter.get("/current", authenticate, current);
userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);
module.exports = userRouter;
