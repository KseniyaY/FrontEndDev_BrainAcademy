var size = parseInt(prompt("enter array size"));  
var array,
	max;

try {
	array = randomArray(size);
} catch (error) {
	console.error(error.stack);
	console.error(error.message);
	console.error("Wrong arguments");
} finally {
	array = array ? array : [0];
}

max = getMax(array);

console.log(array);
console.log(max);
  
function getMax (arr) {
	var max = 0;
	for (var i in arr) {
		if (arr[i] > max) {
			max = arr[i];
		}
	}
	return max;
}

function randomArray(size) {
	var arr = [];

	if (typeof size !== "number" || isNaN(size) || size <= 0) {
		throw new Error('Size must be a positive number');
		return;
	}

	for (var i = 0; i < size; i++) {
		arr.push(Math.round(Math.random() * 100));
	}

	return arr;
}





