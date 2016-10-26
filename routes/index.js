var express = require('express');
var router = express.Router();

//ruta de colecciones
var usuario = require('../moduls/usuario');

/*
 * GET
 */

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Inicio' });
});

router.get('/principal', function(req, res, next) {
	res.render('principal', {title: 'Principal',
							 datos: req.session.datos});
});

router.get('/insercion', function(req, res, next) {
	res.render('insercion', {title: 'Inserta'});
});

router.get('/consulta', function(req, res, next) {
	consulta(req, res);
});

router.get('/morir', function(req, res, next) {
	usuario.remove({_id: req.session.datos[0]._id}, function(error, documento){
		if(!error){
			console.
			req.session.datos = null;
			res.redirect('/')
		}
	})
});

 //inicio sesion
router.post('/inicia', function(req, res, next) {
	
	usuario.find({ _id: req.body.user, password: req.body.pass }, function(error, documento){
		if( !error && documento[0]!=undefined ){
			req.session.datos = documento;
			res.redirect('/principal');
		}else{
			console.log(documento[0]!=undefined)
			res.redirect('/')
		}
	});
})

//nuevo usuario
router.post('/inserta', function(req, res, next) {

	var datos = new usuario({
				_id: 		req.body.id,
				nombre: 	req.body.nombre,
				apellidop: 	req.body.apellidop,
				apellidom: 	req.body.apellidom,
				email: 		req.body.email,
				sexo: 		req.body.sexo,
				password: 	req.body.password
	});
	
	datos.save( function(error, documento){
		if( !error ){
			res.redirect('/principal');
		}
	});
})

//modifica info
router.post('/modifica', function(req, res, next) {

	usuario.update({_id: req.session.datos[0]._id},{
			$set:{

				_id: 		req.body._id,
				nombre: 	req.body.nombre,
				apellidop: 	req.body.apellidop,
				apellidom: 	req.body.apellidom,
				email: 		req.body.email,
				sexo: 		req.body.sexo,
				password: 	req.body.password
					
			}
		}, function(error, documento){
			if(!error){
				req.session.datos[0]._id = req.body.user;
				req.session.datos[0].pass = req.body.pass;
				req.session.datos[0].some = req.body.some;
				res.redirect('/principal');
			}
	});
});

//consulta info
function consulta (req, res){

	usuario.find({}, function(error, documento){
		if( !error && documento[0] != undefined ){
			req.session.amigos = documento;
			res.render('consulta', {title: 'Principal',
							 datos: req.session.datos,
							 amigos: req.session.amigos});
		}
	});
}

module.exports = router;
