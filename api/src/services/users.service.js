const { response } = require("express");
const httpStatus = require("http-status");
const Users = require("../models/users.model");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (email, password) => {
  try {
    const user = await Users.findOne({ email: email });
    if (user == null)
      throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid password !");

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET
    );

    return {
      userID: user._id,
      email: user.email,
      rank: user.rank,
      token: token,
    };
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e);
  }
};

const createUser = async (email, password, oAuthGoogle) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = new Users({
      email: email,
      nickname: email,
      password: hashPassword,
      oAuthGoogle: oAuthGoogle,
      rank: 1,
    });
    var response = await Users.create(user);
    return response;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exist");
  }
};

const modifyUser = async (
  userID,
  email,
  password,
  nickname,
  currency,
  keywords
) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await Users.findOneAndUpdate(
      { _id: userID },
      {
        email: email,
        password: hashPassword,
        nickname: nickname,
        currency: currency,
        keywords: keywords,
      },
      { new: true }
    );
    return user;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Can't find this user");
  }
};

const getUserInfo = async (userID) => {
  try {
    let user = await Users.find({ _id: userID });
    user = user.map((u) => {
      return {
        email: u.email,
        id: u._id,
        nickname: u.nickname,
        currency: u.currency,
        keywords: u.keywords,
        rank: u.rank,
        favorited: u.favorited,
        oAuthGoogle: u.oAuthGoogle,
        password: u.password,
      };
    });

    return user;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Can't find these users");
  }
};

module.exports = {
  getUser,
  createUser,
  modifyUser,
  getUserInfo,
};
