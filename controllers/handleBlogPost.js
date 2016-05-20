// Require the db module with mysql information and connection
var conn = require('../db.js');

module.exports = {

  // This function handles the post and inserts into mysql db,table
  handlePost: function(title, content, cb) {
    var post = {
      title: title,
      content: content,
    };
    // Query for inseritng into 'posts' table
    var query = "INSERT INTO posts SET ?";
    conn.query(query, post, function(err, res) {
      if (err) {
        cb({
          success: false,
          error: err
        });
      } else {
        cb({ // Cb object
          success: true
        })
      }
    })
  },
  // Function that handles the getting of posts from the db,table 'posts' and sorts them
  // by date from the most recent in a descending order.
  getPost: function(cb) {
    var queryString = 'SELECT * FROM posts ORDER BY date DESC';
    var posts = {};
      
    conn.query(queryString, function(err, rows, fields) {
      if (err) {
        cb({
          success: false,
          error: err
        });
      } else {
        cb({
          success: true,
          data: function() {
            // Logging for debugging
            console.log(rows); 
            // Loops throw the data and outputs it into an object
            // With title, content and date of the post
            for (var i = 0; i < rows.length; i++) { 
              posts[i] = {title: rows[i].title, content: rows[i].content, date: rows[i].date};
            }
            return posts; // Return the posts object with title, content and date
          }
        });

      }
    });
  }
}