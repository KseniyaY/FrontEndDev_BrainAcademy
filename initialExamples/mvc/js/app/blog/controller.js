define(['post/main', 'comment/main', 'utils/extend', 'base/controller', 'base/templates', 'base/classes'], function (Post, Comment, extend, BaseController, tpl, cls) {

	var BlogController = function (view, model) {
		BlogController.superclass.constructor.apply(this, arguments);

		this.posts = [];
        
		this.renderAllPosts(model);
		this.renderAllComments(model);
	}

	BlogController.prototype.subscribeToViewEvents = function () {
		var self = this;
		this.view.subscribe("create", function (body, head) {
			self.model.create({body: body, postname: head}, "posts");
		}, null, "posts")
	}

	BlogController.prototype.updateModel = function () {

	};

	BlogController.prototype.updateView = function () {
		this.renderAllPosts();
    };
    
    BlogController.prototype.findPostById = function (id) {
       return this.posts.find(function (post) {
            return post.model.getId() === id;
        });
    }

    BlogController.prototype.create = function (data, type) {
    	this.model.create({body: data[0], postname: data[1]});
    }

    BlogController.prototype.addNewItem = function (data, type) {
    	if (type === "comments") {
    		this.createComment(data, this.findPostById(data.postId));
    	} else {
    		this.createPost(data);
    	}
    	
    }

	BlogController.prototype.createPost  = function (data) {
		var self = this;
		var view = new Post.View(tpl("post"), cls("post"));
		var model = new Post.Model(data, this.model.store);
		var controller = new Post.Controller(view, model);
        var post = {
            view: view, 
            model: model, 
            controller: controller
        };        
        
		view.subscribe('create', function (body) {
			self.model.create({body: body, postId: model.getId()}, "comments");
		});
        
		this.posts.push(post);
		this.view.addPost(view.element);
	}

	BlogController.prototype.renderAllPosts = function () {
		var posts = this.model.getPosts();
		for (var i in posts) {
			this.createPost(posts[i]);
		}
	}    
    
	BlogController.prototype.createComment  = function (data, post) {
		var view = new Comment.View(tpl("comment"), cls("comment"));
		var model = new Comment.Model(data, this.model.store);
		var controller = new Comment.Controller(view, model);

		post.comments = post.comments || [];

		post.comments.push({view: view, model: model, controller: controller});

		post.view.addComment(view.element);
	}

	BlogController.prototype.renderAllComments = function () {
		var comments = this.model.getComments(),
			self = this,
			temp = [];		
		for (var i in this.posts) {		
			for (var j in comments) {
				if(comments[j].postId === self.posts[i].model.getId()) {
					temp.push(comments[j])
				}
			}
			for (var j in temp) {
				this.createComment(temp[j], this.posts[i]);
			}
			temp = [];
		}
	}

	BlogController.prototype.sortPosts = function () {

	}

	BlogController.prototype.filterPosts = function () {

	}

	extend(BaseController, BlogController);

	return BlogController;
});