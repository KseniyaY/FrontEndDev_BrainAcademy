
var formProperties = [
{
 tag: "input", 
 attributes: 
	 {
	 name: "login",  
	 type: "text",
	 placeholder: "Input your e-mail"
	 },
  label: "Login",
},
{
 type:"password",
 label:"Password",
 name:"pass"
},
{
 type:"fieldset",
 label:"Options",
 items: [
   {
    type:"radio",
    name:"radios",
    value:"opt1"
   },
   {
    type:"radio",
    name:"radios",
    value:"opt2"
   },
   {
    type:"radio",
    name:"radios",
    value:"opt3"
   }
  ]
},
{
 type:"submit",
 value:"Submit"
}
]

	function buildForm () {
		var divForForm = document.getElementById("forForm");
		var dynamicForm = document.createElement("FORM");
		divForForm.appendChild(dynamicForm);
		
		
			for (var i in formProperties) {
				console.log(i);
				if (formProperties[i].type === "fieldset") {
		        var inputField = document.createElement(formProperties[i].type);
		        } else { inputField = document.createElement("INPUT");
		        }

				var label = document.createElement("LABEL");
				dynamicForm.appendChild(label);
				if (formProperties[i].label !== undefined) { 
					var labelText = document.createTextNode(formProperties[i].label+": ");
				}

				label.appendChild(labelText);
				dynamicForm.appendChild(inputField);

					for (var key in formProperties[i]) {
						var obj = formProperties[i];
						console.log(typeof obj[key] + " " + key);
						if (typeof obj[key] !== "object" && key.valueOf() !== "label") {
							console.log(" Not an object");
							inputField.setAttribute(key, obj[key]);
					}
					}
				
					for (var j in formProperties[i].attributes) {
			            inputField.setAttribute(j, formProperties[i].attributes[j]);
	        		}
					
					if (Array.isArray(formProperties[i].items)) {
						console.log("It's an array");
						var arr = formProperties[i].items;
						for (var inc = 0; inc < arr.length; inc++) {
							console.log (inc);
							var radio = document.createElement("INPUT");
						 	inputField.appendChild(radio);
							for (var m in arr[inc]) {
						 			console.log (m);
						 			radio.setAttribute(m, arr[inc][m])
						 	}
						}
					}
			}		
		}

		buildForm();




//Пример альтернативного массива с объектами для построения форм
var formProperties2 = [
{
 type: "text",
 label: "Login",
 name: "login"
},
{
 type:"password",
 label:"Password",
 name:"pass"
},
{
 type:"radio-group",
 label:"Options",
 items: [
   {
    type:"radio",
    name:"radios",
    value:"opt1"
   },
   {
    type:"radio",
    name:"radios",
    value:"opt2"
   },
   {
    type:"radio",
    name:"radios",
    value:"opt3"
   }
  ]
},
{
 type:"submit",
 label:"OK"
}
]


	function buildForm2 () {
		var divForForm = document.getElementById("forForm2");
		var dynamicForm = document.createElement("FORM");
		divForForm.appendChild(dynamicForm);
		
		
			for (var i in formProperties2) {
				console.log(i);
				if (formProperties2[i].type === "fieldset") {
		        var inputField = document.createElement("FIELDSET");
		        } else { inputField = document.createElement("INPUT");
		        }

				// var label = document.createElement("LABEL");
				// dynamicForm.appendChild(label);
				// if (formProperties2[i].label !== undefined) { 
				// 	var labelText = document.createTextNode(formProperties2[i].label+": ");
				// }

				// label.appendChild(labelText);
				dynamicForm.appendChild(inputField);

					for (var key in formProperties2[i]) {
						var obj = formProperties2[i];
						console.log(typeof obj[key] + " " + key);
						if (key.valueOf() === "label") {
							var label = document.createElement("LABEL");
							var labelText = document.createTextNode(obj[key] + ": ");
							label.appendChild(labelText);
							dynamicForm.appendChild(label);
						}
						if (typeof obj[key] !== "object" && key.valueOf() !== "label") {
							console.log(" Not an object");
							inputField.setAttribute(key, obj[key]);
						}	
					}
				
					for (var j in formProperties2[i].attributes) {
			            inputField.setAttribute(j, formProperties2[i].attributes[j]);
	        		}
					
					if (Array.isArray(formProperties2[i].items)) {
						console.log(typeof formProperties2[i].items + " It's an array");
						var arr = formProperties2[i].items;
						for (var inc = 0; inc < arr.length; inc++) {
							console.log (inc);
							var radio = document.createElement("INPUT");
						 	inputField.appendChild(radio);
							for (var m in arr[inc]) {
						 			console.log (m);
						 			radio.setAttribute(m, arr[inc][m])
						 	}
						}
					}
			}		
		}

		buildForm2();


		//более конкретизированный код, с привязкой к именам свойств объектов
// var divForForm = document.getElementById("forForm");
// 	var dynamicForm = document.createElement("FORM");
// 	divForForm.appendChild(dynamicForm);
	
	// 	function buildForm () {
	// 		for (var i in formProperties) {
	// 			console.log(i);
	// 			if (formProperties[i].type === "fieldset") {
	// 	        var inputField = document.createElement("FIELDSET");
	// 	        } else { inputField = document.createElement("INPUT");
	// 	        }

	// 			var label = document.createElement("LABEL");
	// 			dynamicForm.appendChild(label);
	// 			if (formProperties[i].label !== undefined) { 
	// 				var labelText = document.createTextNode(formProperties[i].label+": ");
	// 			}

	// 			label.appendChild(labelText);
	// 			dynamicForm.appendChild(inputField);

			
	// 			if (formProperties[i].name !== undefined) {
	// 					inputField.setAttribute("name", formProperties[i].name);
	// 			};
					
	// 			if (formProperties[i].value !== undefined) {
	// 					inputField.setAttribute("value", formProperties[i].value);
	// 			};

	// 			if (formProperties[i].placeholder !== undefined) {
	// 					inputField.setAttribute("value", formProperties[i].placeholder);
	// 			};

	// 			inputField.setAttribute("name", formProperties[i].name);
	// 			inputField.setAttribute("type", formProperties[i].type);
			
	// 			for (j in formProperties[i].attributes) {
	// 		            inputField.setAttribute(j, formProperties[i].attributes[j]);
	//         	}
					
	// 			if (Array.isArray(formProperties[i].items)) {
	// 				console.log(typeof formProperties[i].items + " It's an array");
	// 				var arr = formProperties[i].items;
	// 					for (var inc = 0; inc < arr.length; inc++) {
	// 						console.log (inc);
	// 						var radio = document.createElement("INPUT");
	// 					 	inputField.appendChild(radio);
	// 						for (var m in arr[inc]) {
	// 					 			console.log (m);
	// 					 			radio.setAttribute(m, arr[inc][m])
	// 					 	}
	// 					}
	// 			}
	// 		}
	// }		

	// buildForm();


//	Еще один пример функции с разницей в доступе к свойствам объектов при установке аттрибутов элементов


// function createForm() {
//     var x = document.createElement("FORM");
//     x.setAttribute("id", "myForm");
//     document.body.appendChild(x);

//     for (var i in formProperties) {
//         if (formProperties[i].type === "fieldset") {
//             var input = document.createElement("FIELDSET");
//         } else input = document.createElement("INPUT");

//         var label = document.createElement("LABEL");
//         var labelText = document.createTextNode(formProperties[i].label + ": ");
//         x.appendChild(label);
//         label.appendChild(labelText);
//         x.appendChild(input);

        

//         for (j in formProperties[i].attributes) {
//            input.setAttribute(j, formProperties[i].attributes[j]);
//   		 }

//         // var y = formProperties[i].attributes;
//         //  for (key in y) {
//         //  	input.setAttribute("name", y.name);
//         //      input.setAttribute("name", y.name);
//         //      input.setAttribute("type", y.type);
//         //  }

//         input.setAttribute("name", formProperties[i].name);
//         input.setAttribute("type", formProperties[i].type);

//         var z = formProperties[i].items;
//             for (j in z) {
//                 var radioButton = document.createElement("INPUT");
//                 input.appendChild(radioButton);
//                 radioButton.setAttribute("name", z[j].name);
//                 radioButton.setAttribute("type", z[j].type);
//                 radioButton.setAttribute("value", z[j].value);
//         }
//     }
// }

// createForm();
