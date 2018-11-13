

var mongoose = require("mongoose");

//Schema is a decription (the definition) of the mongoDB document.
var infoSchema = mongoose.Schema({
	ident: {
		unique: true,
		required: true,
		type:String
	},
	name: {
		type:String
	}
});



//var Info = mongoose.model("Info",{
//	ident: {
//		required: true,
//		unique: true,
//		type:String
//	},
//	name: String
//});

var Images = mongoose.model("Images", infoSchema);



module.exports = Images;



