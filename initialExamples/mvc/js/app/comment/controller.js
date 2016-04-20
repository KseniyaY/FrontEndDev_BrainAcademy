define(['base/controller', 'utils/extend'], function (BaseController, extend) {
	var Controller = function (view, model) {
		Controller.superclass.constructor.apply(this, arguments);
		this.updateView();
	}

	extend(BaseController, Controller);

	return Controller;
});