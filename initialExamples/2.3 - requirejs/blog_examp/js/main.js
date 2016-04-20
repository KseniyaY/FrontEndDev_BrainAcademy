define(['./xhr_utils', './blog/post'], function(xhrUtils, Post) {
	var container = document.getElementById('container');
	var posts = [];
	var comments = [];

	xhrUtils.getAll("posts", getAllPostsAndComments, xhrUtils.failedRequest);

	function getAllPostsAndComments (postContent) {
		xhrUtils.getAll('comments', function (commentData){
			renderAllPosts(postContent, commentData);
		}, xhrUtils.failedRequest);		
	}

	function renderAllPosts (postContent, commentData) {
		for (var i in postContent) {
			createPost(postContent[i], commentData.filter(function (comment) {
				return comment.postId === postContent[i].id;
			}));
		}

		createPostBlock(function () {
			xhrUtils.getAll("posts", getAllPostsAndRener, xhrUtils.failedRequest);
		});
	}

	function createPostBlock () {
		var head = document.createElement("input");
		var body = document.createElement("input");
		var create = document.createElement("button");
		var wrap =  document.createElement("div");		
		var title = document.createElement('h2');	
		var labelName = document.createElement('label');
		var labelBody = document.createElement('label');
		labelName.innerHTML = "Title: "
		labelBody.innerHTML = "Text: "
		head.type = "text";
		body.type = "textarea";
		title.innerHTML = "Create new post";
		create.innerHTML = "Create";
		wrap.classList.add("newpost");
		labelName.appendChild(head);
		labelBody.appendChild(body);
		wrap.appendChild(title);
		wrap.appendChild(labelName);
		wrap.appendChild(labelBody);
		wrap.appendChild(create);
		document.body.appendChild(wrap);

		create.addEventListener("click", function () {
			xhrUtils.create({body: body.value, postname: head.value }, "posts", function (data) {
				createPost(data);
			});			
		});
	}	

	function createPost (data, comments) {
		var newPost = new Post(data, comments);
		var self = this;

		posts.push(newPost);
		container.appendChild(newPost.element);
	}	
});


