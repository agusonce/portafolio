'use strict'
var Project= require('../models/proyect');
var fs = require('fs');
var path = require('path');
var controller = {
		home: function(req, res){
			return res.status(200).send({
			  message:'hola home'	
			});
		},

		test: function(req, res){
			return res.status(200).send({
				message:'hola test 213'
			});
		},

		saveProyect: function(req, res){
			var project = new Project();
			var params = req.body;

			project.name = params.name;
			project.descripcion= params.descripcion;
			project.categoria= params.categoria;
			project.fecha= params.fecha;
			project.imagen= null;

			project.save((err, projectStored)=> {
				if (err) return res.status(500).send({message: 'error al guardar'});

				if (!projectStored) return res.status(404).send({message: 'no se ah podido guardar'});

				return res.status(200).send({project: projectStored});
			});
			
		},

		getProject: function(req, res){
			var projectId = req.params.id;

			if (projectId == null) return res.status(404).send({message:'el proecto no existe'});

			Project.findById(projectId, (err, project) => {
				if (err) return res.status(500).send({message: 'error al evolver os datos'});
				
				if (!project) return res.status(404).send({message: 'el proyecto no existe'});

				return  res.status(200).send({project});
			});
		},
		getProjects: function(req, res){

			Project.find({}).exec((err, projects) => {

				if(err) return res.status(500).send({message: 'erro al devolver losdatos'});

				if(!projects) return res.status(404).send({message: 'no hay ningun proyecto que mostrar'});

				return res.status(200).send({projects});

			});
		},
		updateprojet: function(req, res){

			var projectId = req.params.id;
			var update = req.body;

			Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdate) => {
				if (err) return res.status(500).send({message:'error 500'});

				if (!projectUpdate) return res.status(404).send({message:'no existe el proyecto el proycto'});

			 return res.status(200).send({project: projectUpdate});

			});


		},

		deleteProject: function(req, res){
			var projectId = req.params.id;

			Project.findByIdAndRemove(projectId, (err, projectRemove) => {
				if(err) return res.status(500).send({message:'no se ha pedido eliminar el proyecto'});
			
				if (!projectRemove) return res.status(404).send({message:'no existe el proyecto el proycto se pudo eliminar el proyecto'});

			 	return res.status(200).send({project:projectRemove});


			});


		},

		uploadImg: function(req, res){
			var projectId = req.params.id;
			var fileName = 'imagen no subida';

			if (req.files) {

				var filePath = req.files.image.path;
				var fileSplit = filePath.split('\\');
				var fileName = fileSplit[1];  
				var extSplit = fileName.split('\.');
				var fileExt = extSplit[1];

				if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
					Project.findByIdAndUpdate(projectId, {imagen: fileName}, {new:true}, (err, projectUpdate) => {
						if (err) return res.status(500).send({message:'la imagen no se subio'});

						if (!projectUpdate) return res.status(404).send({message:'no existe el proyecto..'});

						return res.status(200).send({
							project: projectUpdate
						});

					});

				}else{
					fs.unlink(filePath, (err) => {
						return res.status(200).send({message: 'La extencion no es valida'});
					});
				}

				


			
			}else{
				return res.status(200).send({
					message: 'imagen no subida'
				});
			}
			

		},

		getImageFile: function(req, res){
			var file = req.params.image;
			var path_file = './uploads/'+file;

			fs.exists(path_file, (exists) =>{
				if (exists) {
					return res.sendFile(path.resolve(path_file));
				}else{
					return res.status(200).send({message:'--No existe la imagen...'});

				}
			});
		}


};

module.exports = controller;