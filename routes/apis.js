require('../lib/db');

var express = require('express'),
    mongoose = require('mongoose');

var router = express.Router();

var Users = mongoose.model('Users');
var bcrypt= require('bcrypt-nodejs');

//use bcrypt to encrypt password
var createHash = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
};

//使用者註冊功能
router.post('/register', function(req, res, next) {
  var getname = req.body.accountname;
  var getpwd = req.body.password;
  Users.findOne({
    accountname: getname,
  }, function(err, existUser) {

    if (err) throw err;
    if (getname === '') { 
            res.render('users/register',{
            tempname:'',
            namealert:'使用者名稱不得為空白'
      });
    } 
    else if(existUser){
      // duplicate user
      res.render('users/register',{
        tempname:'',       
        namealert:'名稱已被使用'
      });

    }else if((getpwd ==='') ||(getpwd.length < 3)){
        var tn = req.body.accountname;
        res.render('users/register',{
          tempname:tn,
          pwdalert:'密碼長度需至少超過3個字元'
        })
    }else {
      // create new user
      Users.create({
        accountname: req.body.accountname,
        password: createHash(req.body.password),
      }, function(err, newUser) {
        if (err) throw err;
        console.log('the registered user is', newUser);
        req.session.accountname = req.body.accountname;
        req.session.logined = true;
        res.redirect('/');
      });
    }
  });
});

//使用者登入會員功能
router.post('/login',function(req,res,next){
  var getname = req.body.accountname;
  var getpwd = req.body.password;
    Users.findOne({accountname:getname},function(err,existUsername){
        if(err) throw err;
        if(existUsername){
          
          //retrieve encoded password from DB
          var hash = existUsername.password;

          //applying bcrypt method to check if the password is correct or not
          var check = bcrypt.compareSync(getpwd,hash)
          
            if(err) throw err;
            if(check){
                //accountname and password correct              
                req.session.logined = true;
                req.session.accountname = req.body.accountname;
                res.redirect('/');
            }else{//else check
                    var tn = req.body.accountname;
                    res.render('users/login',{
                      tempname:tn, 
                      pwdalert:'密碼錯誤,請重新輸入'
                    })
                  }//end else
            }else{//else existUsername
              res.render('users/login',{
                tempname:'',
                namealert:'使用者名稱錯誤或不存在'
                })
              }//end else

      })//end Users.findOne({})
  });




module.exports = router;