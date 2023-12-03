const UserModel = require("../db/models/user-model");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, name } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(409).json({
      message: "Email alredy in use",
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

module.exports = {
  signup,
};
