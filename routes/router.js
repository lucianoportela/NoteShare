var nt = require('./controllers/nota');

module.exports = function(app,routes,usuario,logon,nota,io) {
	app.get('/', function(req, res){
		if (req.session.usuario_id == undefined ){
			res.render('index', { title: 'NoteShare' });

		}	else{
			res.render('home', { title: 'NoteShare' });
		}

	});

	io.sockets.on("connection", function(socket){
		console.log("Socket conectado....");
		socket.emit("conectado");

		socket.on("send_nota", function(nota){
			socket.broadcast.emit("menssagem_nota",nota);
		});

		socket.on("send_comentario", function(nota_id,comentario){
			socket.broadcast.emit("menssagem_comentario",nota_id,comentario);
		});

		socket.on("send_excluir_nota", function(nota_id,usuarionome){
			console.log("ID ::::::::::::::::::::::"+nota_id);
			var msg=""+usuarionome+" excluiu sua anotação...";
			socket.broadcast.emit("menssagem_excluir_nota",nota_id,msg);
		});
		socket.on("send_atualiza_nota", function(nota_id,usuarionome){
			console.log("ID ::::::::::::::::::::::"+nota_id);
			var msg=""+usuarionome+" Atualizou a sua anotação...";
			socket.broadcast.emit("menssagem_atualiza_nota",nota_id,msg);
		});                       



	});


	app.post('/usuario', usuario.salvaUsuario);
	app.get('/usuarios', usuario.listaUsuarios);
	app.post('/logon', logon.entrar);
	app.get('/home/notas', nota.listaNotas);
	app.get('/home/notas/:usuario_id', nota.listaNotas);
	app.post('/home/notas/delete/:id', nota.deletaNota);
	app.post('/home/notas/update/:id', nota.atualizaNota);
	app.get('/home/comentarios/:id', nota.listaComentarios);
	app.post('/home/nota', nota.salvaNota);
	app.post('/home/comentario', nota.salvaComentario);

	app.get('/home', function(req, res){
		if (req.session.usuario_id == undefined ){
			res.render('index', { title: 'NoteShare' });
		}else{

			res.render('home', {title: 'NoteShare - Area de trabalho'});
		}
	});


	app.get('/logout', function(req, res){
		req.session.destroy(function(e){ res.render('index', { title: 'NoteShare' }); });
	});



}