$(document).ready(function() {

	var request = $.ajax({
		url: '/posts',
		contentType: 'application/json',
		success: function(post) {
			var html = "";
			console.log(post);
			/*post.forEach(function(post) {
				html += "<article><h1>"+post.title+"</h1><p>"+post.content+"</p></article>";
			});*/
			for (var key in post) {
				// Logging below for debugging
				// Log the title, content and date of all the posts
				console.log(post[key].title);
				console.log(post[key].content);
				console.log(post[key].date);
				var date = post[key].date;
				var formattedDate = moment(date, moment.ISO_8601).format();

				html += "<article><h1>"+post[key].title+"</h1><p>"+formattedDate+"</p><p>"+post[key].content+"</p></article>";

			}
			$('#articles').html(html);
		}
	});

});