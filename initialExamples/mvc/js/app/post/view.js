define(['utils/extend', 'base/view'], function (extend, BaseView, commentView) {

	var View = function (config, classes) {
            View.superclass.constructor.apply(this, arguments);	
        };

    View.prototype._onUpdate = function () {
        var self = this;
        this.body.classList.add("post_body--update");
        setTimeout(function () {
            self.body.classList.remove("post_body--update");
        }, 3000);
    };

    View.prototype.initListeners = function () {
        var self = this;

        this.body = this.findEl(this.classes.body);
        this.header = this.findEl(this.classes.header);

        this.body.addEventListener("focus", function (e) {
            this.classList.remove("post_body--normal")
            this.classList.add("post_body--focus");
        });

        this.body.addEventListener("blur", function (e) {
            this.classList.add("post_body--normal")
            this.classList.remove("post_body--focus");
            self.emitEvent("update", [this.innerHTML]);
        });		

        this.findEl(this.classes.delButton).addEventListener("click", function () {
            self._onDelete();
        });

        this.findEl(this.classes.headerWrap).addEventListener("click", function  () {				
                self.findEl(self.classes.bodyWrap).classList.toggle("hidden");
                self.findEl(self.classes.toggle).innerHTML = self.findEl(self.classes.bodyWrap).classList.contains("hidden") ? "+" : "-";
        });

        this.findEl(this.classes.commentNewCreate).addEventListener('click', function () {
            self.emitEvent("create", [self.findEl(self.classes.commentNewInput).value]);
        });

        this.subscribe("update", this._onUpdate.bind(this));
    };		

    View.prototype.addComment = function (comment) {
        var self = this;
        var commentsBlock = self.findEl(this.classes.commentsBlock);
        commentsBlock.appendChild(comment);
    };

    View.prototype.getContent = function () {
        return this.body.innerHTML;
    };

    View.prototype.setContent = function (data) {
        this.body.innerHTML = data.body;
        this.header.innerHTML = data.postname;
    };

    View.prototype.setHeader = function (data) {
        this.header.innerHTML = data;
    }

    View.prototype.setBody = function (data) {
         this.body.innerHTML = data;
    }

    extend(BaseView, View);

    return View;    
});