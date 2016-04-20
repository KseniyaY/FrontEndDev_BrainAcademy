(function () {
	var input = document.getElementById("postid");
	var btn = document.getElementById("btn");
	var header = document.getElementById("header");
	var body = document.getElementById("post");

	btn.addEventListener("click", function () {
		getPosts(input.value, "posts", renderPost, failedRequest);
	});

	function renderPost (response) {
		header.innerHTML = response.postname;
		body.innerHTML = response.body;
	}

	function failedRequest (response) {
		console.error(responseText);
	}

	function getPosts (id, locator, callbackSuccess, callbackFailure) {   
		var myGetRequest = new XMLHttpRequest();

		myGetRequest.open('GET', 'http://localhost:3000/' + locator + "/" + id, true);

		myGetRequest.send(null);

		myGetRequest.addEventListener("load", function () {
			console.log("Request complete");
			if (myGetRequest.status === 200) {
				callbackSuccess(JSON.parse(myGetRequest.responseText));
			} else {
				callbackFailure(JSON.parse(myGetRequest.responseText));
			}
		});
	}	

	function createPost (data) {

		var myPostRequest = new XMLHttpRequest();

		myPostRequest.open('POST', 'http://localhost:3000/posts', true);

		//setRequestHeader - Задает заголовоки для запроса. 
		//В данном случае, сервер принимает JSON, для этого устанавливаем тип содержимого
		myPostRequest.setRequestHeader("Content-Type", "application/json");

		//JSON.stringify превращает JavaScript-обьект в JSON строку
		myPostRequest.send(JSON.stringify(data));

		myPostRequest.addEventListener("load", function () {
			console.log("Request complete");
			if (myPostRequest.status === 201) {
				console.log("Success!!!");
				console.log(myPostRequest.responseText);
			}
		});
	}
	
})()