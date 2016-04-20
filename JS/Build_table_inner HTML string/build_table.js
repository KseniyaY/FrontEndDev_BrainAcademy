
// экранирование кавычек контента innerHTML с помощью символа \ помогает отделить их от кавычек, необходимых для JS кода. Напр., + " class=\"" в нашей функции ниже. 
	var table = "";
	var row = "";
	var cell = "";

	function buildTable (tag, content, cls, attributes) {
			var attr = attributes ? attributes : "";
			var content = content ? content : "";
			var cls = cls ? cls : "tableStyle";
			return "<" + tag 
			+ " class=\"" 
			+ cls + "\" " 
			+ attr + ">" 
			+ content 
			+ "</" 
			+ tag + ">";
			
		//Примитивный способ для проверки того, как работает построение таблицы с помощью внесения стрингового контента в innerHTML.	
		// var a = buildTable("td", 15);
		// var b = buildTable("td", "places");
		// var c = buildTable("tr", a + b);
		// var e = buildTable("tr", a + b);
		// var f = buildTable("table", c + e);
		// wrapper.innerHTML = f;

		
	}

	//Пропишем отдельную функцию, которую положим в событие, чтобы оегче было обращаться и не дублировать код, если событие с аналогичной функцией нужно будет удалить
	// function loop() {
	// 		for (var i = 0; i < 1; i++ ) {
	// 			for (var k = 0; k < 5; k++ ) {
	// 				for (var m = 0; m < 4; m++) {
	// 					cell+=buildTable("td", 15, "cls");
	// 				}
	// 				row+=buildTable("tr", cell, "cls");
	// 				cell="";
	// 			}
	// 			table+=buildTable("table", row, "cls");
	// }
	var clickMe = document.querySelector("#click");
		
	clickMe.addEventListener("click", function (e) { 
			console.log(e);
			
			for (var i = 0; i < 1; i++ ) {
				for (var k = 0; k < 5; k++ ) {
					for (var m = 0; m < 4; m++) {
						cell+=buildTable("td", 15, "cls");
					}
					row+=buildTable("tr", cell, "cls");
					cell="";
				}
				table+=buildTable("table", row, "cls");
		
			}; 
		var wrapper = document.querySelector(".wrapper");
		wrapper.innerHTML = table; 
	});

	// Обратим внимание – если функцию не сохранить где-либо, а просто передать в addEventListener, как в предыдущем коде, то потом получить её обратно, чтобы снять обработчик, будет невозможно. Нет метода, который позволяет считать обработчики событий, назначенные через addEventListener.

	//clickMe.removeEventListener("click", function (e) { 
	// 			console.log(e);
				
	// 			for (var i = 0; i < 1; i++ ) {
	// 				for (var k = 0; k < 5; k++ ) {
	// 					for (var m = 0; m < 4; m++) {
	// 						cell+=buildTable("td", 15, "cls");
	// 					}
	// 					row+=buildTable("tr", cell, "cls");
	// 					cell="";
	// 				}
	// 				table+=buildTable("table", row, "cls");
			
	// 			}; 
	// 		var wrapper = document.querySelector(".wrapper");
	// 		wrapper.innerHTML = table; 
	// });
