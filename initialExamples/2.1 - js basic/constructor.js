var Person = function (name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype.sayHi = function () {
	console.log("Hi, I'm " + this.name + ". I'm " + this.age + "years old.");
}
Person.prototype.aaa = "bbb";

var joe = new Person("Joe", 25);
joe.sayHi();

var vasya = new Person("Vasya", 33);
vasya.sayHi();

var obj = {
	name: "aaa",
	age:333
}

Person.prototype.sayHi.call(obj)

function objToArray (obj) {
	var arr = [];
	if (!Array.isArray(obj)) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				arr.push(obj[i]);
			}
		}
		return arr;
	}
	console.log("Onlyworks with objects");
}