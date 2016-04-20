var enterText = prompt('Enter text');

function foo (callback) {
	var isErr,
		tempText = enterText;
	try {
		callback();
	} catch (e) {
		console.error(e.stack);
		console.error(e);
		isErr = true;
	} finally {
		deafultFn();
	}

	function deafultFn () {
		enterText = isErr ? tempText : enterText;
	}
}

function badFn () {
	if (enterText !== "ZZZ") {	
		enterText = "ASDbshgds";
		throw new Error("ASDbshgds");
	}
}

foo(badFn);

console.log("Still working!!!");
console.log(enterText);

badFn();
// not working
