{
	text: "aaa@bbb.com",
	validator: /(^[a-z]?=((([.\-\_]?)?![.\-\_])|[a-z0-9]+)+)@([a-z-]{2,}.)+[a-z]{2,}/
}

{
	text: "+380964445533",
	validator: /\+\d{12}/
}

var validators = (function () {
	var valObj = {
		mail: /[a-z0-9.-_]{3,}@([a-z0-9.-]{2,}.[a-z]{2,})+/,
		phone: /\+\d{12}/
	};

	return {
		getValidator: function (valType) {
			return valObj[valType];
		},
		addValidator: function (valType, reg) {
			if (!valObj[valType]) {
				valObj[valType] = reg;				
			}
		}
	}	
})();

var ValidString = function (text, validator) {
	this.validator = validators.getValidator(validator);
	this.text = text;
	this.isValid = this.validate();
}

ValidString.prototype.validate = function () {
	return this.validator.test(this.text);
}

ValidString.create = function (text, reg) {
	return new ValidString(text, reg);
}

var email = new ValidString("aaa@bbb.com", "mail");
var phone = new ValidString("+380964445533", "phone");