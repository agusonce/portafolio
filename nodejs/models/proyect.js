'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	name: String,
	descripcion: String,
	categoria: String,
	fecha: Number,
	imagen: String
});

module.exports = mongoose.model('Project' , ProjectSchema);