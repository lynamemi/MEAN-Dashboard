var mongoose = require('mongoose'),
	modelFiles = require('fs'),
	path = require('path'),
	models_path = path.join(__dirname, './../models'),
	reg = new RegExp(".js$", "i"),
	dbURI = 'mongodb://localhost/dashboard'

mongoose.Promise = global.Promise;
mongoose.connect(dbURI);

mongoose.connection.on( 'connected', function() {
	console.log(`Mongoose default connection open to ${ dbURI }`)
});
mongoose.connection.on('error', function(err) {
	console.error(`Mongoose degault connection error: ${err}`);
});
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
	mongoose.connection.close( function() {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});

modelFiles.readdirSync(models_path).forEach(function (file) {
	if(file.indexOf('.js')>=0) {
		require(models_path + '/' + file);
	}
})