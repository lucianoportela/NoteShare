
/**
 * Dependências
 */
 
 var express = require('express');
 var routes = require('./routes');
 var usuario = require('./routes/controllers/usuario');
 var logon = require('./routes/controllers/logon');
 var nota = require('./routes/controllers/nota');
 var http = require('http');
 var path = require('path');
 var connection  = require('express-myconnection'); 
 var mysql = require('mysql');
 var app = express();
 var server = http.createServer(app);
 var io = require('socket.io').listen(server);

// Ambientes
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'super-noteshare-secret-secret' }));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));



if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.use(  
	connection(mysql,{     
		host: 'localhost',
		user: 'root',
		password : 'root',
		port : 3306, 
		database:'noteshare'
	},'pool') 

	);

app.use(app.router);
require('./routes/router')(app,routes,usuario,logon,nota,io);
server.listen(app.get('port'));