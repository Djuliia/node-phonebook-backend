const UserModel = require("../db/models/user-model");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { SECRET_KEY } = process.env;
const avatarDir = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, name } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(409).json({
      message: "Email already in use",
    });
    return;
  }

  const avatarURL = gravatar.url(email);

  const newUser = new UserModel({ ...req.body, avatarURL });
  await newUser.hashPassword();
  await newUser.save();

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);

  await UserModel.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: { name, email, avatarURL },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
    return;
  }

  const comparePassword = await user.comparePassword(password);

  if (!comparePassword) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await UserModel.findByIdAndUpdate(user._id, { token });

  res.json({
    user: { name: user.name, email, avatarURL: user.avatarURL },
    token,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await UserModel.findByIdAndUpdate(_id, { token: "" });

  res.sendStatus(204);
};

const current = (req, res) => {
  const { name, email, avatarURL } = req.user;

  res.json({
    name,
    email,
    avatarURL,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    res.status(400).json({
      message: "File is not defined",
    });
  }
  const { path: tempUpload, originalname } = req.file;

  const avatarImg = await Jimp.read(tempUpload);
  await avatarImg.cover(250, 250).writeAsync(tempUpload);

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);
  await UserModel.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar,
};
