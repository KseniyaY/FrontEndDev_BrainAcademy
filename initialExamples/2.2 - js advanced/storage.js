var inputs = [
	document.getElementById("in1"),
	document.getElementById("in2"),
	document.getElementById("in3")
];


inputs.forEach(function (el) {
	if (sessionStorage.getItem("forms")) {
		el.value = JSON.parse(sessionStorage.getItem("forms"))[el.id];
	}
});

window.addEventListener("beforeunload", function () {
	var forms = {};
	sessionStorage.clear("forms");
	inputs.forEach(function (el) {
		forms[el.id] = el.value;		
	});
	sessionStorage.setItem("forms", JSON.stringify(forms));
});