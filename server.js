var express = require('express');
var fs = require('fs');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var http = require('http');


const basedir = __dirname + '/public/'; // Set the basedir as the /public/ directory
const httpPort = 3000; // Pick the port for the express server

var connection = require('./db.js');
var hbp = require('./controllers/handleBlogPost.js');

// app.engine('handlebars', exphbs({defaultLayout: 'post'}));  // Use the handlebars view engine
// app.set('view engine', 'handlebars'); // set the view engine

app.set('views', __dirname + '/views'); // Set the view directory
app.set('view engine', 'pug'); // Use the pug view engine


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(basedir)); // Set the basedir as the static dir for express


app.get('/', function(req, res) {
	// Sends the index.html to the page
	res.render('index');
});

app.get('/post', function(req, res, next) {
	// render the post-form view upon '/post' GET request
  res.render('post-form');
});

app.get('/posts', function(req, res) {

	hbp.getPost(function(result) {
		if(result.success) {
			// Stores the object in data variable
			var data = result.data();
			res.send(data); // Sends the object to the ajax request
		} else {
			console.log("Failed");
		}
	});

});
// Post the form
app.post('/', function(req, res) {
	res.setHeader('Content-Type', 'application/json'); // Sets header to JSON
	hbp.handlePost(req.body.title, req.body.content, function(data) { // Handlepost function to post form data to db
		if (data.success) {
		} else {
		}
	});

	res.redirect(req.get('referer')); // Refreshes the page to empty the form

});

app.listen(httpPort, function() {
	console.log("Express Server running on port: " + httpPort);
});