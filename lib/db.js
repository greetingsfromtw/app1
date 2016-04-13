var mongoose = require('mongoose')

var Schema = mongoose.Schema

var Users = new Schema({
	accountname:String,
	password:String
})

var Todo = new Schema({
	accountname:String,
	item:String
})
mongoose.model('Users',Users)
mongoose.model('Todo',Todo)
mongoose.connect('mongodb://localhost/app1')

