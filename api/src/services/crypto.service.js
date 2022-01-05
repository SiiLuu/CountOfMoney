const httpStatus = require("http-status");
const User = require("../models/users.model");
const Crypto = require("../models/crypto.model");
const ApiError = require("../utils/ApiError");
const {
  cryptoApi,
  getBasicInfo,
  getHistoryData,
} = require("../utils/cryptoApi");
const axios = require("axios");
const moment = require("moment");

client = new cryptoApi();

const getCryptoList = async () => {
  try {
    let cryptos = await Crypto.find({});
    let allCryptosData = [];
    for (let i = 0; i < cryptos.length; i++) {
      let crypto = cryptos[i].cmid;
      await axios.all([getBasicInfo(crypto), getHistoryData(crypto)]).then(
        axios.spread((basicInfo, historyData) => {
          if (basicInfo.data[0] && historyData.data[0])
            allCryptosData.push({
              cmid: basicInfo.data[0].symbol,
              name: basicInfo.data[0].name,
              currentPrice: parseInt(basicInfo.data[0].price, 10),
              openingPrice: historyData.data[0].price_open,
              lowestPrice: historyData.data[0].price_low,
              highestPrice: historyData.data[0].price_high,
              photo: basicInfo.data[0].logo_url,
            });
        })
      );
    }
    return allCryptosData;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e);
  }
};

const getCryptoDetails = async (cmid) => {
  try {
    let resp = {};
    await axios.all([getBasicInfo(cmid), getHistoryData(cmid)]).then(
      axios.spread((basicInfo, historyData) => {
        if (basicInfo.data[0] && historyData.data[0]) {
          resp = {
            cmid: basicInfo.data[0].symbol,
            name: basicInfo.data[0].name,
            currentPrice: parseInt(basicInfo.data[0].price, 10),
            openingPrice: historyData.data[0].price_open,
            lowestPrice: historyData.data[0].price_low,
            highestPrice: historyData.data[0].price_high,
            photo: basicInfo.data[0].logo_url,
          };
        }
      })
    );
    return resp;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e);
  }
};

const getCryptoHistory = async (cmid, period) => {
  try {
    let time = moment().utc();
    let startDate;
    let timeframe;

    if (period == "daily") {
      startDate = time.startOf("day").subtract(59, "days");
      timeframe = "1DAY";
    } else if (period == "hourly") {
      startDate = time.startOf("hour").subtract(47, "hours");
      timeframe = "1HRS";
    } else if (period == "minute") {
      startDate = time.startOf("minute").subtract(60, "minutes");
      timeframe = "1MIN";
    }

    const resp = await client.clientCoinApi(`/ohlcv/${cmid}/USD/history`, {
      params: {
        period_id: timeframe,
        time_start: startDate.format("YYYY-MM-DDTHH:mm:ss"),
      },
    });
    return resp.data;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e);
  }
};

const addCrypto = async (cmid) => {
  try {
    // Add new crypto to database
    let newCrypto = new Crypto({
      cmid: cmid,
    });
    await newCrypto.save();
    return 1;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e);
  }
};

const deleteCrypto = async (cmid) => {
  try {
    // Delete crypto from database
    await Crypto.deleteOne({ cmid: cmid });
    return 1;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e);
  }
};

const favoriteCrypto = async (userID, cmid) => {
  try {
    // Add new crypto to user favorites
    let user = await User.findById(userID);
    if (user) {
      user.favorited.push(cmid);
      await user.save();
    }
    return 1;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e);
  }
};

const deleteFavoriteCrypto = async (userID, cmid) => {
  try {
    // Add new crypto to user favorites
    let user = await User.findById(userID);
    if (user) {
      // user.favorited.delete(cmid);
      var index = user.favorited.indexOf(cmid);
      if (index !== -1) {
        user.favorited.splice(index, 1);
      }
      await user.save();
    }
    return 1;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e);
  }
};

const getCryptoHistoryDate = async (cmid, startDate, endDate) => {
  try {
    const resp = await client.clientCoinApi(`/ohlcv/${cmid}/USD/history`, {
      params: {
        period_id: "1DAY",
        time_start: startDate,
        time_end: endDate,
      },
    });
    return resp.data;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e);
  }
};

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
