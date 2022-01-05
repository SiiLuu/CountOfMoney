const express = require("express");
const validate = require("../middlewares/validate");
const usersController = require("../controllers/users.controller");
const usersValidation = require("../validations/users.validation");
const userMiddleware = require("../middlewares/users.middlewares");

const router = express.Router();

router.post(
  "/login",
  validate(usersValidation.userCredentials),
  usersController.getUser
);

router.post(
  "/register",
  validate(usersValidation.userCredentials),
  usersController.createUser
);

// Need to be logged in to get user information
router.get("/profile", userMiddleware.auth(), usersController.getUserInfo);

// Need to be logged in to modify user
router.put(
  "/profile",
  userMiddleware.auth(),
  validate(usersValidation.userToModify),
  usersController.modifyUser
);

router.post("/logout", userMiddleware.auth(), usersController.logoutUser);

module.exports = router;
