define(['utils/extend', 'base/view', 'post/main', 'base/classes'], function (extend, BaseView, Post, cls) {

	var BlogView = function (config, classes) {
        BlogView.superclass.constructor.apply(this, arguments);
    };
        
    BlogView.prototype.addPost = function (postEl) {
        this.element.appendChild(postEl);
    };

    BlogView.prototype.getContent = function () {
        
    };

    BlogView.prototype.initListeners = function (config, classes) {
        var self = this;

        this.findEl(classes.newPostButton).addEventListener("click", function () {
            var head = self.findEl(classes.newPostHead);
            var body = self.findEl(classes.newPostBody);
            self.emitEvent("create", [body.value, head.value], null, "posts");            
        });
    };

    extend(BaseView, BlogView);

	return BlogView;
})