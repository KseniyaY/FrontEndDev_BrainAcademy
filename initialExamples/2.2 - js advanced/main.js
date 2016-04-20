var App = App || {};

App.main = (function () {
	var container = document.getElementById('container');

	function getAllPostsAndRener (content) {
		App.blog.initContainer();
		for (var i in content) {
			App.blog.createPost(content[i]);
		}
		App.blog.createPostBlock(function () {
			xhrUtils.getAll("posts", getAllPostsAndRener, failedRequest);
		});
	}

	function failedRequest (response) {
		console.error(responseText);
	}

	xhrUtils.getAll("posts", getAllPostsAndRener, failedRequest);

	return {
		failedRequest: failedRequest
	}
})()


