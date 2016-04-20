//для начала сформирую запрос Get
//потом построю ДОМ-фрагмент для отображения джейсон данных
//потом создам запрос на создание и отправку на сервер новых данных
//вызову прорисовку ДОМ-фрагмента
//потом создам вопрос на удаление данных из джейсон объекта
//следом удаление DOM-фрагмента

var xhrModule = (function () {

	function getByID(id, locator, callbackSuccess, callbackFailure) {   
		uniRequest("GET", null, id, locator, callbackSuccess, callbackFailure);
	}

	function getAll(locator, callbackSuccess, callbackFailure) {   
		uniRequest("GET", null, null, locator, callbackSuccess, callbackFailure); //вызов функции uniRequest (универсальнй запрос) c переданными обязательными аргументами в виде метода и null для data, dataId, а также переменной locator, которая будет разной для разного типа запрашиваемых данных; а также две коллбек функции, которые будут разными для каждого из вызываемых запросов
	}

	function create(data, locator, callbackSuccess, callbackFailure) {
		uniRequest("POST", data, null, locator, callbackSuccess, callbackFailure);
	}

	function update(data, id, locator, callbackSuccess, callbackFailure) {
		uniRequest("PUT", data, id, locator, callbackSuccess, callbackFailure);
	}

	function deleteRecord (id, locator, callbackSuccess, callbackFailure) {
		uniRequest("DELETE", null, id, locator, callbackSuccess, callbackFailure);
	}

	//создаем коллбек функцию для формирования любого типа запроса на сервер с аргументами в виде:
	//типа запроса, передаваемых данных, id данных, с которыми необходимо произвести действие запроса, локатора, и двух коллбек функций
	//закладываем стандартную последовательность шагов обработки запросов:
	//open, setRequestHeader (если используем тип обработки данных запроса, к примеру, CREATE или PUT в самом перевом шаге с методом open), завершаем обработку запроса методом send
	function uniRequest (type, data, dataId, locator, callback, failure) {
		var newRequest = new XMLHttpRequest(),
			id = dataId ? dataId : "", //сохраняем в переменную инструкцию по работе с аргументом dataId, который принимает в себя переменная uri, необходимая при выполнении метода open
			uri = 'http://localhost:3000/' + locator + '/' + id; //сохраняем в переменную конструкцию для формирования ссылки доступа к данным на сервере

		newRequest.open(type, uri, true); //

		//setRequestHeader - Задает заголовоки для запроса. 
		//В данном случае, сервер принимает JSON, для этого устанавливаем тип содержимого
		newRequest.setRequestHeader("Content-Type", "application/json"); //

		//JSON.stringify превращает JavaScript-обьект в JSON строку
		newRequest.send(data ? JSON.stringify(data) : null); //в качестве аргумента к методу send, кладем тернарную функцию: если data передается (т.е. аргумент не null), то применить метод перевода данных в джейсон строку, а иначе оставить null (считать, что ничего не передается)

		//добавляем к нашему новому XMLHttpRequest-объекту-конструктору ивент onload, функция для которого сработает, когда браузер завершит загрузку страницы по тому адресу, который мы передаем в uri

		newRequest.addEventListener("load", function () {
			console.log("Request complete");
			//если статус запроса будет соответствовать 200 или 201, то можно считать запрос удачным, и если в таком случае в метод запроса передается определенная функция, положенная в переменную callback, то мы вызываем ее с 2 аргументами: 1-м - в виде метода JSON, который распарсит текст запроса, и 2-м - в виде самого запроса, который передается)
			if (newRequest.status === 200 || newRequest.status === 201) {
				console.log("Success!!!");
				if (callback) {
					callback(JSON.parse(newRequest.responseText), newRequest);					
				}
				//иначе (если не 200 или 201) и при этом в аргумент передана коллбек функция failure, то вызываем эту функцию с аргументом в виде распарсенного JSON объекта в виде responseText запроса
			} else if (failure) {
				failure(JSON.parse(newRequest.responseText));
			}
		});
	}	
	//данную функцию мы можем положить в качестве аргумента к другой, если нам необходимо будет вывести ошибку в консоль о неудачном запросе с тестом responseText
	function failedRequest (response) {
		console.error(responseText);
	}

	//результатом функционала этого объекта-модуля xhrUtils, должен быть возврат его свойств-методов, значениями которых являются имена функций. Надо заметить, что в значения мы сохраняем просто имена функций, а не их вызов, иначе они все сработают сразу, а не в той последовательности, с которой мы хотим вызывать запросы. Вызываем мы эти функции уже в самом главном файле main.js
	return {
		getByID: getByID,
		getAll: getAll,
		create: create,
		update: update,
		deleteRecord: deleteRecord
	}  
})();