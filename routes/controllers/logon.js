
var util = require("./util");
exports.entrar = function(req, res) {    
	
	var input = JSON.parse(JSON.stringify(req.body));

	var logon = {
		email   : input.email,
		senha   : input.senha
	};    
	manualLogin(req,logon.email, logon.senha,function(e, user){    
		if (!user){
			var alerts=[{ type: 'warning', label:'Aviso!', msg: 'Nome de usuário e/ou senha incorretos.' }];				
			res.json({ alerts: alerts });        

		}  
		else{
			req.session.usuario_id = user.id;                 
			req.session.nome = user.nome;                 
			req.session.email = user.email;
			if (req.param('remember_me') == true){
				res.cookie('email', user.email, { maxAge: 24*3600000 });
				res.cookie('senha', user.senha, { maxAge: 24*3600000 });
			}
			var usuarioSession={
				usuario_id:req.session.usuario_id,
				nome:req.session.nome,
				email:req.session.email
			}
			res.json({ redirect: '/home', usuarioSession:usuarioSession });

		}
	});
}

var manualLogin = function(req,email, senha, callback)
{
	req.getConnection(function (err, connection) {
		 var query =connection.query("SELECT * FROM usuario WHERE email = ? ",[email], function(err, rows)
		{
			if (err){
               console.log("select: %s ",err );
			}

			if (rows[0]){
				util.validasenha(senha, rows[0].senha, function(err, res) {
					if (res){
						callback(null, rows[0]);
					}	else{
						callback('invalid-password');
					}
				});

			}	else{
				callback('user-not-found');
			}        	
		});     
	});
}

 