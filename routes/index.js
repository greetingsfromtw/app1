require('../lib/db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

/* GET home page. */
router.get('/', function(req,res,next) {
  res.locals.accountname = req.session.accountname;
  res.locals.logined = req.session.logined;

  res.render('index');
});



module.exports = router;
