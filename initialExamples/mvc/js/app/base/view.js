define(['utils/extend', 'utils/event-emiter', 'utils/template'], function (extend, Emiter, tpl) {

	var View = function (template, classes) {
            View.superclass.constructor.call(this);
            this.classes = classes;
            
            this.element = document.createElement('div');
            
            this.createTemplate(template, classes);
            this.initListeners(template, classes);
        }; 
        
        View.prototype._onDelete = function () {
            this.destroy();
            this.emitEvent("delete", this);
        };
        
        View.prototype._onCreate = function (data) {
            this.emitEvent("create", [data]);
        };

        View.prototype.findEl = function (selector) {
            return this.element.querySelector('.' + selector);
        };

        View.prototype.findAll = function (selector) {
            return this.element.querySelectorAll('.' + selector);
        };

        View.prototype.createTemplate = function (template, classes) {	
           this.element.innerHTML = tpl(template, classes);

        };

        View.prototype.initListeners = function () {
            /*override me*/
        };

        View.prototype.getContent = function () {
            /*override me*/
        };
        
        View.prototype.setContent = function () {
            /*override me*/
        };

        View.prototype.destroy = function () {
            this.element.remove();
        };
    
    extend(Emiter, View);

	return View;
});