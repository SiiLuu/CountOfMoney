const Users = require("../models/users.model");
const jwt = require('jsonwebtoken');
const httpStatus = require("http-status");

const auth = (schema) => (req, res, next) => {
    const token = req.header('jwt');
    if (!token)
        return res.status(httpStatus.BAD_REQUEST).send({ message: "You need to login first" });

    try {
        req.userID = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "Bad JWT token" });
    };
    return next()
};

const checkRank = async (userID, expectedRank) => {
    const user = await Users.findOne({ _id: userID, rank: expectedRank })

    if (user != null)
        return true
    else
        return false
};

module.exports = {
    auth,
    checkRank
};