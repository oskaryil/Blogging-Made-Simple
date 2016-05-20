var mysql = require('mysql');
var connection = mysql.createConnection({
  host  : "127.0.0.1",
  user  : "root",
  password : "secret",
  database  : "blog_posts"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

module.exports = connection;