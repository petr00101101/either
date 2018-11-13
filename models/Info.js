var mongoose = require("mongoose");

//Schema is a decription (the definition) of the mongoDB document.
var infoSchema = mongoose.Schema({
	left: {
		required: true,
		unique: true,
		type: Object
	},
	right: {
		required: true,
		unique: true,
		type: Object
	},
    leftValue: {
		required: false, 
		type: Number
	},
    rightValue: {
		required: false,
		type: Number
	},
	comment: {
		required: false,
		unique: false,
		type: Array
	}

});

var Info = mongoose.model("Info", infoSchema);

module.exports = Info;
