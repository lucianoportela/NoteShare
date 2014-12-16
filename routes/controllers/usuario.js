var util = require("./util");


 exports.listaUsuarios = function(req, res){
 	req.getConnection(function(err,connection){
 		var query = connection.query('SELECT * FROM usuario',function(err,rows)
 		{
 			if(err)
 				console.log("Error Selecting : %s ",err );
 			res.json({ usuarios:rows });
 		});
 		console.log(query.sql);
 	});
 };



 exports.salvaUsuario = function(req,res){


    var input = JSON.parse(JSON.stringify(req.body));
 	console.log("user:"+JSON.stringify(req.body) );    

    req.getConnection(function (err, connection) {
        var usuario = {
            nome    : input.nome,
            email   : input.email,
            senha   : input.senha
        };    	
    	util.saltAndHash(usuario.senha, function(hash){
    		usuario.senha = hash;
    		var query = connection.query("INSERT INTO usuario set ? ",usuario, function(err, rows)
    		{
    			if (err)
    				console.log("Error inserting : %s ",err );

    		
            req.session.usuario_id = rows.insertId;                
            req.session.nome = usuario.nome;                 
            req.session.email = usuario.email;

        var usuarioSession={
                usuario_id:rows.insertId,
                nome:usuario.nome,
                email:usuario.email
            }
            res.json({ redirect: '/home', usuarioSession:usuarioSession });






    		});
			console.log(query.sql); 
    	});
    		
    	
    });
};


