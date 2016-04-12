var mongoose = require('mongoose')

var Schema = mongoose.Schema

var Users = new Schema({
	accountname:String,
	password:String
})

mongoose.model('Users',Users)
mongoose.connect('mongodb://localhost/app1')

