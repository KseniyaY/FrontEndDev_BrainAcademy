define(function () {
	return function (tag, content, cls, attributes) {
		var attr = attributes ? attributes : "";
		return "<" + tag 
		+ " class=\"" 
		+ cls + "\" " 
		+ attr + ">" 
		+ content 
		+ "</" 
		+ tag + ">";
	}
});