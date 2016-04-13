require('../lib/db');
var express = require('express');
var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var router = express.Router();


//使用者註冊頁面
router.get('/register',function(req,res,next){
	res.render('users/register',{
		tempname:''
	});
});

//使用者登入頁面
router.get('/login',function(req,res,next){
	res.render('users/login',{
		tempname:''
	});
});

//使用者登出頁面
router.get('/logout',function(req,res,next){
	req.session.logined = false;
	req.session.username = '';
	res.redirect('/');
	res.end();
});

//使用者設定頁面
router.get('/profile',function(req,res,next){
	res.render('users/profile');

});
module.exports = router;
