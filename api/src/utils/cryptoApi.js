const axios = require('axios');
const moment = require('moment');
const config = require('../config/config');

class cryptoApi {
  constructor() {
    this.clientNomicsApi = axios.create({
      baseURL: 'https://api.nomics.com/v1',
      method: 'get',
      responseType: 'json',
      params: {key: config.apiKey.nomics }
    });

    this.clientCoinApi = axios.create({
      baseURL: 'https://rest.coinapi.io/v1',
      method: 'get',
      responseType: 'json',
      params: { apikey: config.apiKey.coinApi }
    });
  }
}

function getBasicInfo(crypto) {
  client = new cryptoApi()
  return client.clientNomicsApi('/currencies/ticker', {
    params: {
      ids: crypto
    }
  });
}

function getHistoryData(crypto) {
  let time = moment();
  client = new cryptoApi()
  return client.clientCoinApi(`/ohlcv/${crypto}/USD/history`, {
    params: {
      period_id: "1DAY",
      time_start: time.startOf('day').format("YYYY-MM-DDTHH:mm:ss")
    }
  });
}

module.exports = {
  cryptoApi,
  getBasicInfo,
  getHistoryData
};
