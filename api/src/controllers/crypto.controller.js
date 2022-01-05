const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { cryptoService } = require("../services");
const usersMiddleware = require("../middlewares/users.middlewares");

const getCryptoList = catchAsync(async (req, res) => {
  const crypto = await cryptoService.getCryptoList();

  if (crypto)
    res.status(httpStatus.CREATED).send({ message: "Success", data: crypto });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const getCryptoDetails = catchAsync(async (req, res) => {
  const crypto = await cryptoService.getCryptoDetails(req.params.cmid);

  if (crypto)
    res.status(httpStatus.CREATED).send({ message: "Success", data: crypto });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const getCryptoHistory = catchAsync(async (req, res) => {
  const crypto = await cryptoService.getCryptoHistory(
    req.params.cmid,
    req.params.period
  );

  if (crypto)
    res.status(httpStatus.CREATED).send({ message: "Success", data: crypto });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const addCrypto = catchAsync(async (req, res) => {
  const authorized = await usersMiddleware.checkRank(req.userID, 2);
  if (authorized == false)
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "You need to be a manager" });
  else {
    const crypto = await cryptoService.addCrypto(req.body.cmid);

    if (crypto) res.status(httpStatus.CREATED).send({ message: "Success" });
    else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
  }
});

const deleteCrypto = catchAsync(async (req, res) => {
  const authorized = await usersMiddleware.checkRank(req.userID, 2);
  if (authorized == false)
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "You need to be a manager" });
  else {
    const crypto = await cryptoService.deleteCrypto(req.body.cmid);

    if (crypto) res.status(httpStatus.CREATED).send({ message: "Success" });
    else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
  }
});

const favoriteCrypto = catchAsync(async (req, res) => {
  const crypto = await cryptoService.favoriteCrypto(req.userID, req.body.cmid);

  if (crypto) res.status(httpStatus.CREATED).send({ message: "Success" });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const deleteFavoriteCrypto = catchAsync(async (req, res) => {
  const crypto = await cryptoService.deleteFavoriteCrypto(
    req.userID,
    req.body.cmid
  );

  if (crypto) res.status(httpStatus.CREATED).send({ message: "Success" });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const getCryptoHistoryDate = catchAsync(async (req, res) => {
  const crypto = await cryptoService.getCryptoHistoryDate(
    req.params.cmid,
    req.body.startDate,
    req.body.endDate
  );

  if (crypto)
    res.status(httpStatus.CREATED).send({ message: "Success", data: crypto });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

module.exports = {
  getCryptoList,
  getCryptoDetails,
  getCryptoHistory,
  addCrypto,
  deleteFavoriteCrypto,
  deleteCrypto,
  favoriteCrypto,
  getCryptoHistoryDate,
};
