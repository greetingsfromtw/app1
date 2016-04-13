require('../lib/db');

var express = require('express'),
    mongoose = require('mongoose');
var router = express.Router();
var Todo = mongoose.model('Todo');

//待辦事項頁面
router.get('/',function(req,res,next){
  if(!req.session.logined){
    res.redirect('/users/login')
  }
  res.locals.logined= req.session.logined;
  res.locals.accountname= req.session.accountname;

  Todo.find({accountname: req.session.accountname},function ( err, todos, count ){
      res.render('todo/todo',{
        todos:todos
      })
    }) 
  });


//新增事項
router.post('/add',function(req,res){
  Todo.create({
    accountname:req.session.accountname,
    item:req.body.add
  })
  res.locals.logined= req.session.logined;
  
  Todo.find({accountname: req.session.accountname},function ( err, todos, count ){
    res.redirect('/todo')
  })  
})

//刪除事項
router.get('/delete/:id', function(req, res, next) {
    Todo.remove({ _id: req.params.id }, function(err) {
        if (err)
            console.log('Fail to delete item.');
        else
            console.log('Done');
    });
    res.locals.logined= req.session.logined;
  Todo.find({accountname: req.session.accountname},function ( err, todos, count ){
  res.redirect('/todo')
  })  
})


//編輯事項
router.get('/edit/:id', function(req, res, next) {
  Todo.find({ _id: req.params.id }, function ( err, todos, count ){
    res.render( 'todo/edit', {
      title:'todo list testing',
      todos:todos,
      getid:req.params.id
    });
  });   
});

//更新事項
router.post('/update/:id', function(req, res, next) {
    Todo.update({ _id: req.params.id }, { item: req.body.getitem }, function(err) {
        if (err)
            console.log('Fail to update item.');
        else
            console.log('Done');
    })
    res.locals.logined= req.session.logined;
    Todo.find({accountname: req.session.accountname},function ( err, todos, count ){
  res.redirect( '/todo')
  })   
});






module.exports = router;