var App = App || {};
App.main = (function () {
	var frame = document.getElementById('frame');
	var inputs;
	var paragraphs;
	var tasks = [];
	var header;
	var body;
	var inputDate;


	getAllTasks();

	(function todoPattern () {
		var initialPattern = document.createElement('div');
		var patternText = document.createElement('h3');
		patternText.innerHTML = 'Place your new task here';
		initialPattern.classList.add('task_block');
		var headerName = document.createElement('p');
		headerName.innerHTML = 'The title of the task';
		header = document.createElement('textarea');
		header.setAttribute('rows', '4');
		header.setAttribute('cols', '50');
		header.innerHTML = header.value;
		var bodyName = document.createElement('p');
		bodyName.innerHTML = 'The description of the task'
		body = document.createElement('textarea');
		body.setAttribute('rows', '10');
		body.setAttribute('cols', '50');
		body.style.display = 'block';
		body.innerHTML = body.value;
		var dateText = document.createElement('p');
		dateText.innerHTML = 'Specify the end date of execution';
		inputDate = document.createElement('input');
		inputDate.style.display = 'block';
		inputDate.setAttribute('type', 'date');
		inputDate.innerHTML = inputDate.value;
		var createButton = document.createElement('button');
		createButton.classList.add('buttons');
		var createText = document.createTextNode("Create the task");
		createButton.appendChild(createText);
		var cancelButton = document.createElement('button');
		cancelButton.classList.add('buttons', 'cancelButton');		
		var cancelText = document.createTextNode("Cancel the Task");
		cancelButton.appendChild(cancelText);
		initialPattern.appendChild(patternText);
		initialPattern.appendChild(headerName);
		initialPattern.appendChild(header);
		initialPattern.appendChild(bodyName);
		initialPattern.appendChild(body);
		initialPattern.appendChild(dateText);
		initialPattern.appendChild(inputDate);
		initialPattern.appendChild(cancelButton);
		initialPattern.appendChild(createButton);

		frame.appendChild(initialPattern);
		// var inputs = document.querySelectorAll('input');
		// var paragraphs = document.querySelectorAll('p');
		// inputs.classList.add('inputs');
		// paragraphs.classList.add('paragraphs');

	

		createButton.addEventListener("click", function (e) {
			xhrModule.create({name: header.value, description: body.value, dueDate: new Date(inputDate.value), isDone: status.value}, "tasks", function (data) {
			getAllTasks();
			renderAllTasks();
			console.log(e);
			});		
		});

		cancelButton.addEventListener("click", function (e) {
			header.value = "";
			body.value = "";
			inputDate.value = "";
			console.log(e);
		});
	})()

	function getAllTasks () {
			xhrModule.getAll("tasks", function (taskData) {				
					taskData = taskData;
					renderAllTasks(taskData);
			}, xhrModule.failedRequest);
		}

	//пишем функцию для импорта данных из джейсон объекта (по которому мы проходимся циклом) и отображения структуры данных на странице браузера каждого объекта в массиве tasks, благодаря вызову функции buildTasksBlock, которая построит ДОМ-фрагмент для блока задача и добавит его в общую ДОМ-модель
	function renderAllTasks (taskData) {
			for (var i in taskData) {
				createTask(taskData[i]);
			}

			header.value = "";
			body.value = "";
			inputDate.value = "";
			// buildTasksBlock(function () {
			// 	xhrModule.getAll("tasks", getAllPostsAndRener, xhrModule.failedRequest); //getAllPostsAndRener - коллбек, который по идее, не будет вызван, если не будет найден и функция последует дальше по стеку
			// });
	}

	// function buildTasksBlock () {
	// 		// var title = document.getElementById("taskName");
	// 		// var description = document.getElementById("taskDescription");
	// 		// var date = document.getElementById("dueDate");
	// 		// var status = document.getElementById("taskStatus");
	// 		//на кнопку addTask вешаем событие на клик, которое запустит XMLHttp запрос типа CREATE, описанного в модуле xhrModule
	// 		// addTask.addEventListener("click", function () {
	// 		// 	xhrModule.create({description: description.value, name: title.value, dueDate: date.value, isDone: status.value}, "tasks", function (data) {
	// 		// 		createTask(data);
	// 		// 	});			
	// 		// });
	// }	


	function createTask (data) {
			var task = newTask(data);
			var self = this;

			// tasks.push(task); //метод push для массива tasks позволит подставить в конец массива данные из переменной task, который сформируются путем вызова еще одной функции newTask(data);
			tasks.unshift(task); //метод unshift для массива tasks позволит подставить в начало массива данные из переменной task, который сформируются путем вызова еще одной функции newTask(data);
			frame.insertBefore(task, frame.childNodes[1]); //в наш див frame добавим новый элемент task
		}	


	function newTask (content) {
			var taskElement, title, description, dueDate, status, editTask, delTask, id, termText;

			taskElement = document.createElement('div');
			taskElement.classList.add('task_block');


			id = content.id;

			createTitle();

			createDescription();

			editTask();

			createDate();

			createTerm();

			createStatus();

			deleteTask();

			launchListeners();

			renderContent();

			
			function createTitle () {		
				var self = this;
				title = document.createElement('div');
				if (content.isDone === "true") {
					title.classList.add("task_name_done");
				}
				else {
				title.classList.add("task_name");
				}

				title.setAttribute("contenteditable", "");
				// title.content = document.createElement('span');
				// title.appendChild(title.content);		
				taskElement.appendChild(title);		
			}

			function createDescription () {	
				description = document.createElement('div');
				description.classList.add("task_description"); //присваиваем стили к диву description
				description.setAttribute("contenteditable", ""); //устанавливаем атрибут contenteditable диву description, чтобы иметь возможность редактировать описание задачи
				taskElement.appendChild(description); //в element, в который мы положили пустой див, добавляем еще один див с нашим телом задачи - description
			}


			function editTask() {
				var self = this;
				editTask = document.createElement('button');
				editTask.innerHTML = "Edit Task"; 
				editTask.classList.add('edit');
				editTask.style.display='block';
				taskElement.appendChild(editTask);
			}


			function createDate () {
				var self = this;
				dueDate = document.createElement('p');
				taskElement.appendChild(dueDate);
			}

			function createTerm () {
				var self = this;
				termText = document.createElement('p');
				var timeLeft = document.createElement('span');
				termText.innerHTML = "It's " + howLong() + " days left";
				termText.style.display = 'block';
				termText.appendChild(timeLeft);
				taskElement.appendChild(termText);
				function howLong () {
					var today = new Date();
					var timeLeft = Math.ceil((new Date(content.dueDate) - today)/43200000);
					return timeLeft;
				}	
			}

				function createStatus () {
				var self = this;
				var statusText = document.createElement('p');
				statusText.style.display = 'inline-block';
				statusText.style.paddingRight = '10px';
				var setText = document.createTextNode("Done");
				statusText.appendChild(setText);
				taskElement.appendChild(statusText);
				status = document.createElement('input');
				status.setAttribute('type', 'radio');
				taskElement.appendChild(status);		
			}


			function deleteTask() {
				var self = this;
				delTask = document.createElement('button');
				delTask.innerHTML = "Delete Task"; 
				delTask.classList.add('delete');
				delTask.style.display='inline-block';
				delTask.style.float='right';
				taskElement.appendChild(delTask);	
			}

			function launchListeners () {
			
				delTask.addEventListener("click", function (e) {
					xhrModule.deleteRecord(id, "tasks", function () {
						destroy();
					}, xhrModule.failedRequest);
				});

				editTask.addEventListener("click", sendChanges);
								

				function statusEvent () {
					var done = document.createElement('p');
					var realEndDate = new Date();
					done.innerHTML = 'This task was finished on ' + realEndDate.toLocaleDateString();
					title.classList.add("task_name_done");
					var realTerm =  document.createElement('p');
					realTerm.innerHTML = 'It took ' + Math.ceil((realEndDate - new Date(content.dueDate))/43200000) + " days";
					taskElement.appendChild(done);
					taskElement.insertBefore(realTerm, delTask);
					editTask.style.display = 'none';
					termText.style.display = 'none';
					content.isDone = 'true';
					sendChanges();
				}
				
				status.addEventListener("click", statusEvent, function (e) {e.stopPropagation});
			}

			function renderContent () {
				title.innerHTML = content.name;
				description.innerHTML = content.description;
				var assignedDate= new Date (content.dueDate);
				dueDate.innerHTML = "The end date of execution is: " + assignedDate.toLocaleDateString();
				status.value = content.isDone;
			}

			function sendChanges () {
				content.name = title.innerHTML;
				content.description = description.innerHTML;
				content.isDone = status.value;
				xhrModule.update(content, id, 'tasks');
			}

			function destroy () {
				taskElement.remove(); //The jQuery remove() method removes the selected element(s) and its child elements.
			}

			return taskElement;
		}
})()