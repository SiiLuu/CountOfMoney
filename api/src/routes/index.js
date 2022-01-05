const express = require('express');
const userRoute = require('./users.route');
const cryptoRoute = require('./crypto.route');
const rssRoute = require('./rss.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/crypto',
    route: cryptoRoute,
  },
  {
    path: '/rss',
    route: rssRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
