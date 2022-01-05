const express = require("express");
const validate = require("../middlewares/validate");
const cryptoController = require("../controllers/crypto.controller");
const cryptoValidation = require("../validations/crypto.validation");
const userMiddleware = require("../middlewares/users.middlewares");

const router = express.Router();

router.get("/", cryptoController.getCryptoList);

router.get("/:cmid", cryptoController.getCryptoDetails);

router.get("/:cmid/history/:period", cryptoController.getCryptoHistory);

router.post(
  "/:cmid/historyDate/:period",
  validate(cryptoValidation.getCryptoHistory),
  cryptoController.getCryptoHistoryDate
);

router.post(
  "/favorite",
  userMiddleware.auth(),
  validate(cryptoValidation.addCrypto),
  cryptoController.favoriteCrypto
);

router.delete(
  "/favorite",
  userMiddleware.auth(),
  validate(cryptoValidation.deleteCrypto),
  cryptoController.deleteFavoriteCrypto
);

// Need to be an admin
router.post(
  "/",
  userMiddleware.auth(),
  validate(cryptoValidation.addCrypto),
  cryptoController.addCrypto
);

// Need to be an admin
router.delete("/", userMiddleware.auth(), cryptoController.deleteCrypto);

module.exports = router;
