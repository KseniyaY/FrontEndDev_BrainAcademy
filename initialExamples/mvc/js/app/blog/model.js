define(['utils/extend', 'base/model'], function (extend, BaseModel) {

	var Model = function (data, store, type) {
		Model.superclass.constructor.call(this, data, store, ["posts", "comments"]);
	};

	Model.prototype.getPosts = function () {
		return this.getContent("posts");
	}

	Model.prototype.getComments = function () {
		return this.getContent("comments");
	}

	extend(BaseModel, Model);

	return Model;
});