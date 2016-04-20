var foo = (function () {
	var somevar = 10;
	return function () {
		return somevar;
	}
})();