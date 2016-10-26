//coleccion de usuario
var mongoose = require('mongoose');

var Usuario = mongoose.Schema({

	_id: {type: String, required: true},
	nombre: {type: String, required: true},
	apellidop: {type: String, required: true},
	apellidom: {type: String, required: true},
	email: {type: String, required: true},
	sexo: {type: String, required: true},
	password: {type: String, required: true}
	
});

module.exports = mongoose.model('usuario', Usuario);
