"use strict";

module.exports = function (req, res, next) {
  if (!req.session.auth) {
    return res.redirect('/auth/login');
  }

  next();
};