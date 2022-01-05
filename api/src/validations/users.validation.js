const Joi = require("joi");

const userCredentials = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    oAuthGoogle: Joi.boolean().required(),
  }),
};

const userToModify = {
  body: Joi.object().keys({
    email: Joi.string(),
    password: Joi.string(),
    nickname: Joi.string(),
    currency: Joi.string(),
    keywords: Joi.array(),
  }),
};

module.exports = {
  userCredentials,
  userToModify,
};
