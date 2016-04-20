var App = App || {};

App.blog = (function () {
	var posts = [];
	var container;

	return {
		createPostBlock: function (handler) {
			var head = document.createElement("input");
			var body = document.createElement("input");
			var create = document.createElement("button");
			head.type = "text";
			body.type = "text";
			create.innerHTML = "Create";
			container.appendChild(head);
			container.appendChild(body);
			container.appendChild(create);
			create.addEventListener("click", function () {
				xhrUtils.create({body: body.value, postname: head.value}, "posts", function () {
					posts = []
					container.innerHTML = "";
					handler();
				});			
			});
		},

		removePost: function (post) {
			container.removeChild(post.element);
		},

		createPost: function(data) {
			var newPost = new this.Post(data, container);
			var self = this;

			newPost.header.del.addEventListener("click", function (e) {
				xhrUtils.deleteRecord(newPost.id, "posts", function () {
					self.removePost(newPost);
				}, App.main.failedRequest);
			});

			posts.push(newPost);
			container.appendChild(newPost.element);
		},

		getPostById: function (id) {
			return posts.find(function (post) {
				if (post.id === id) {
					return true;
				}
			});
		},

		getPosts: function () {
			return posts;
		},

		initContainer: function () {
			container = document.getElementById('container');
		}
	}
})();

App.blog.Post = (function () {
	var Post = function (content, cnt) { 
		var body, header;
		this.content = content;
		this.element = document.createElement('div');

		this.id = content.id;

		this.createHeader();

		this.createBody();

		this.initListeners();

		this.renderContent();
	}

	Post.prototype.renderContent = function () {
		this.body.innerHTML = this.content.body;
		this.header.content.innerHTML = this.content.postname;
	}

	Post.prototype.createBody = function () {		
		this.body = document.createElement('div');
		this.body.classList.add("hidden");		
		this.body.classList.add("post_body");	
		this.body.classList.add("post_body--normal");	
		this.body.setAttribute("contenteditable", "");
		this.element.appendChild(this.body);
	}

	Post.prototype.createHeader = function () {		
		var self = this;
		this.header = document.createElement('div');
		this.header.classList.add("post_header");
		this.header.toggle = document.createElement('span');
		this.header.toggle.innerHTML = '  + ';
		this.header.content = document.createElement('span');
		this.header.del = document.createElement('button');
		this.header.del.innerHTML = "Delete"; 
		this.header.appendChild(this.header.toggle);
		this.header.appendChild(this.header.del);
		this.header.appendChild(this.header.content);
		this.element.appendChild(this.header);		
	}

	Post.prototype.toggleBody = function () {
		this.body.classList.toggle("hidden");
	}

	Post.prototype.sendChanges = function () {		
		this.content.body = this.body.innerHTML;
		xhrUtils.update(this.content, this.id, 'posts', this.onUpdate.bind(this));
	}

	Post.prototype.onUpdate = function () {
		var self = this;
		this.body.classList.add("post_body--update");
		setTimeout(function () {
			self.body.classList.remove("post_body--update");
		}, 3000);
	}

	Post.prototype.initListeners = function () {
		var self = this;
		this.header.toggle.addEventListener('click', function () {
			self.toggleBody();
			this.innerHTML = this.innerHTML === "  + " ? "  - " : "  + ";
		});

		this.body.addEventListener("focus", function (e) {
			this.classList.remove("post_body--normal")
			this.classList.add("post_body--focus");
		});
		this.body.addEventListener("blur", function (e) {
			this.classList.add("post_body--normal")
			this.classList.remove("post_body--focus");
			self.sendChanges();
		});
	}
	return Post;
})();