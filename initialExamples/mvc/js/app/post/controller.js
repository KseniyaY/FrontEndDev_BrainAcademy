define(['utils/extend', 'base/controller', 'comment/main'], function (extend, BaseController, Comment) {
	var PostController = function (view, model) {
		PostController.superclass.constructor.apply(this, arguments);
		this.updateView();
	}

	PostController.prototype.updateView = function () {
		this.view.setBody(this.model.getBody());
		this.view.setHeader(this.model.getHeader());
	}

	PostController.prototype.updateModel = function () {
		this.model.setBody(this.view.getContent());
	}	

	PostController.prototype.create = function () {
		
	}	

	PostController.prototype.destroy = function () {		
		this.view = null;
		this.model = null;
	}

	extend(BaseController, PostController);

	return PostController;
});