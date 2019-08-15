'use strict'

var express = require('express');
var ProyectControlller = require('../controllers/proyect');


var router = express.Router();

var multipart = require('connect-multiparty');

//asigno en donde voy a guardar las las imagenes 
var multipartMiddeware = multipart({ uploadDir: './uploads'});


router.get('/home', ProyectControlller.home);
router.post('/test', ProyectControlller.test);
router.post('/save-proyec', ProyectControlller.saveProyect);
router.get('/project/:id?', ProyectControlller.getProject);
router.get('/projects/', ProyectControlller.getProjects);
router.put('/projectUpdate/:id', ProyectControlller.updateprojet);
router.delete('/projectDelete/:id', ProyectControlller.deleteProject);
router.post('/uploadImagen/:id', multipartMiddeware, ProyectControlller.uploadImg);
router.get('/getImage/:image', ProyectControlller.getImageFile);


module.exports = router;

