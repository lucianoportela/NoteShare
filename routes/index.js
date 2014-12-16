var conexoes = 0;

exports.index = function(req, res){
	conexoes++;
	console.log(conexoes);
	console.log("req.cookies.usuario:    "+req.cookies.usuario);	

	if (req.cookies.usuario == undefined  ){
	     res.render('index', { title: 'Express' });
      }

};



