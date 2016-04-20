define(['utils/extend', 'base/model'], function (extend, BaseModel) {

	var CommentModel = function (data, store) {
		this.type = "comments";
		CommentModel.superclass.constructor.apply(this, arguments);
	}

	extend(BaseModel, CommentModel);

	return CommentModel;
});