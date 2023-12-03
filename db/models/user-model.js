const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  const comparePassword = await bcrypt.compare(password, this.password);

  return comparePassword;
};

const UserModel = model("user", userSchema);

module.exports = UserModel;
