/*Funções*/
var crypto 		= require('crypto');
var moment 		= require('moment');



exports.validasenha = function(plainPass, hashedPass, callback)
{
	console.log("validatePassword", hashedPass);
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}
var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}
exports.saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}
var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

