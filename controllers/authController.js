import * as authServices from "../services/authServices.js";

import HttpError from "../helpers/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const signup = async (req, res) => {
  const newUser = await authServices.signup(req.body);
  res.status(201).json(newUser);
};

const signin = async (req, res) => {
  const user = await authServices.signin(req.body);

  res.json(user);
};

const getCurrent = (req, res) => {
  const { username, email } = req.user;

  res.json({
    username,
    email,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;

  await authServices.updateUser({ _id }, { token: "" });

  res.json({
    message: "Logout success",
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
