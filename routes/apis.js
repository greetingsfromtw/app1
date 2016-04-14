require('../lib/db');

var express = require('express'),
    mongoose = require('mongoose');

var router = express.Router();

var Users = mongoose.model('Users');
var bcrypt= require('bcrypt-nodejs');

var isValidpwd = function(user,password){
  return bcrypt.compareSync(password,user.password);
};

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

//bCrypt.compareSync(getpwd, Users.password)


//使用者登入會員功能
router.post('/login',function(req,res,next){
  var getname = req.body.accountname;
  var getpwd = req.body.password;
    Users.findOne({accountname:getname},function(err,existUsername){
        if(err) throw err;
        if(existUsername){
          var hash = existUsername.password;
          console.log(hash);
          Users.findOne({
            password:getpwd
          },function(err,existPwd){
            console.log(getpwd);
            if(err) throw err;
            if(existPwd){
                //res.send('account correct')              
                req.session.logined = true;
                req.session.accountname = req.body.accountname;
                res.redirect('/');
            }else{//else existPwd
                    var tn = req.body.accountname;
                    res.render('users/login',{
                      tempname:tn, 
                      pwdalert:'密碼錯誤,請重新輸入'
                    });
                  }
              });
            }else{//else existUsername
              res.render('users/login',{
                tempname:'',
                namealert:'使用者名稱錯誤或不存在'
                })
              }//end if

      });//end Users.findOne({})
  });




module.exports = router;