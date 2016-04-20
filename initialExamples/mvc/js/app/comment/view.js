define(['utils/extend', 'base/view'], function (extend, BaseView) {
    var View = function (config, classes) {
        View.superclass.constructor.apply(this, arguments);
        this.body = this.findEl(classes.body);
    };   

    View.prototype.initListeners = function () {
        var self = this;
        this.findEl(this.classes.btn).addEventListener('click', function () {
            self._onDelete();
        });
    }

    View.prototype.getContent = function () {
        return [this.body.innerHTML];
    };

    View.prototype.setContent = function (data) {
        return this.body.innerHTML = data.body;
    };

    extend(BaseView, View);

	return View;
});