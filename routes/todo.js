require('../lib/db');

var express = require('express'),
    mongoose = require('mongoose');

var router = express.Router();

var Todo = mongoose.model('Todo');

//待辦事項頁面
router.get('/todo',function(req,res,next){
  res.render('todo/todo')
});


//新增事項
router.post('/add',function(req,res){
  Todo.create({
    item:req.body.add
  })
  res.locals.logined= req.session.logined;
  Todo.find(function ( err, todos, count ){
  res.redirect('/todo/todo')
  })  
})

//刪除事項
router.get('/delete/:id', function(req, res, next) {
    Todo.remove({ _id: req.params.id }, function(err) {
        if (err)
            console.log('Fail to delete article.');
        else
            console.log('Done');
    });
    res.locals.logined= req.session.logined;
  Todo.find(function ( err, todos, count ){
  res.redirect( '/todo')
  })  
})


//編輯事項
router.get('todo/edit/:id', function(req, res, next) {
  res.locals.logined= req.session.logined;
  Todo.find({ _id: req.params.id }, function ( err, todos, count ){
    res.render( 'todo/edit', {
      title:'todo list testing',
      todos:todos,
      getid:req.params.id
    });
  });   
});

//更新事項
router.post('todo/update/:id', function(req, res, next) {
    Todo.update({ _id: req.params.id }, { item: req.body.getitem }, function(err) {
        if (err)
            console.log('Fail to update item.');
        else
            console.log('Done');
    })
    res.locals.logined= req.session.logined;
    Todo.find(function ( err, todos, count ){
  res.redirect( '/todo')
  })   
});






module.exports = router;