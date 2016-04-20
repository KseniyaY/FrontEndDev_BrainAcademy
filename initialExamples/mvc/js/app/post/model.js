define(['utils/extend', 'base/model'], function (extend, BaseModel) {

	var PostModel = function (data, store) {
		this.type = "posts";
		PostModel.superclass.constructor.apply(this, arguments);
	}

	PostModel.prototype.getBody = function () {
		return this.getContent("body");
	};

	PostModel.prototype.setBody = function (data) {
		this.setContent({body: data});
	}

	PostModel.prototype.getHeader = function () {
		return this.getContent("postname");
	};

	extend(BaseModel, PostModel);

	return PostModel;
});