define(function (require) {
	var Comment = function (data, container) {
		this.container = container;
		this.data = data;

		this.createElement();
	}
	
	Comment.prototype.createElement = function () {
		this.element = document.createElement('div');
		this.element.classList.add("comment");
		this.element.innerHTML = this.data.body;	
		this.container.appendChild(this.element);
	}

	return Comment;
});