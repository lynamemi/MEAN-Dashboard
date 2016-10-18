var mongoose = require('mongoose'),
	express = require('express'),
	session = require('express-session'),
	path = require('path'),
	bodyParser = require('body-parser'),
	root = __dirname,
	port = process.env.PORT || 8000,
	app = express();

app.set('trust proxy', 1)
app.use(session({
	secret: 'supersecret',
	resave: false,
	saveUninitialized:true,
	cookie: {secure:false}
}))

app.use(express.static(path.join(root, './client')))
app.use(express.static(path.join(root, './bower_components')))
app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function() {
	console.log(`server running on port ${port}`);
});