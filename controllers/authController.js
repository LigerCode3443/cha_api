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
  const user = req.user;

  res.json(user);
};

const signout = async (req, res) => {
  const { _id } = req.user;

  await authServices.updateUser({ _id }, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const userById = async (req, res) => {
  const { _id } = req.body;

  const user = await authServices.findUserById(_id);

  res.json(user);
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  userById: ctrlWrapper(userById),
};
