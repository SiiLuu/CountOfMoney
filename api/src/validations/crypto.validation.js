const Joi = require('joi');

const addCrypto = {
  body: Joi.object().keys({
    cmid: Joi.string().required()
  }),
};

const deleteCrypto = {
  body: Joi.object().keys({
    cmid: Joi.string().required()
  }),
};

const getCryptoHistory = {
  body: Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
  }),
};

module.exports = {
  addCrypto,
  deleteCrypto,
  getCryptoHistory
};
