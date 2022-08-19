"use strict";

module.exports = function (req, res, next) {
  res.render('error', {
    layout: 'auth'
  });
};