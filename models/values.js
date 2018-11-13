var mongoose = require("mongoose");

//Schema is a decription (the definition) of the mongoDB document.
var infoSchema = mongoose.Schema({
	id: {
		required: true,
		type: String
	},
	value: {
		required: true,
		type: Number
	}
});

var values = mongoose.model("values", infoSchema);

module.exports = values;
