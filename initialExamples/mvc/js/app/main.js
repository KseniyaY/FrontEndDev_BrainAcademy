requirejs.config({
    baseUrl: 'js/app',
    paths: {
        blog: 'blog',
        post: 'post',        
        comment: 'comment',
        base: 'base',
        utils: '../utils',
        lib: '../lib'
    }
});

requirejs(['blog/main', 'store', 'base/classes', 'base/templates'], function(Blog, Store, cls, tpl) {
	var blog, blogController, blogModel;
    var blog2, blogController2, blogModel2;
	var container = document.getElementById('container');    
    var container2 = document.getElementById('container2');
	var store = new Store (['posts', 'comments']);
    var templates = require('base/templates');
    var classes = require('base/classes');
	store.subscribe("allready", function () {
		if (!blog && !blogController) {
			blog = new Blog.View(tpl('blog'), cls('blog'));
            container.appendChild(blog.element);
            blogModel = new Blog.Model(store.getAll(), store);
			blogController = new Blog.Controller(blog, blogModel);
		}
        if (!blog2 && !blogController2) {
            blog2 = new Blog.View(tpl('blog'), cls('blog'));
            container2.appendChild(blog2.element);
            blogModel2 = new Blog.Model(store.getAll(), store);
            blogController2 = new Blog.Controller(blog2, blogModel);
        }
        window.store = store;
	});
});


