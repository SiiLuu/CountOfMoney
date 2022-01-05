const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { usersService } = require("../services");
const usersValidation = require("../validations/users.validation");
const usersMiddleware = require("../middlewares/users.middlewares");

const getUser = catchAsync(async (req, res) => {
  const user = await usersService.getUser(req.body.email, req.body.password);

  if (user)
    res.status(httpStatus.CREATED).send({ message: "Success", data: user });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const createUser = catchAsync(async (req, res) => {
  const user = await usersService.createUser(
    req.body.email,
    req.body.password,
    req.body.oAuthGoogle
  );

  if (user)
    res.status(httpStatus.CREATED).send({ message: "Success", data: user });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const modifyUser = catchAsync(async (req, res) => {
  const user = await usersService.modifyUser(
    req.userID,
    req.body.email,
    req.body.password,
    req.body.nickname,
    req.body.currency,
    req.body.keywords
  );

  if (user)
    res.status(httpStatus.CREATED).send({ message: "Success", data: user });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const getUserInfo = catchAsync(async (req, res) => {
  const user = await usersService.getUserInfo(req.userID);

  if (user)
    res.status(httpStatus.CREATED).send({ message: "Success", data: user });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const logoutUser = catchAsync(async (req, res) => {
  res.status(httpStatus.CREATED).send({ message: "Success" });
});

module.exports = {
  getUser,
  createUser,
  modifyUser,
  getUserInfo,
  logoutUser,
};
