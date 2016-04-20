var App = App || {};
var qs = function (selector) {
 return document.querySelector(selector);
}

App.fixtures = {
 products: [
  { 
   id: "1", 
   name: "Hat",
   description: "A great and warm hat",
   rating: 5,
   categoryId: "1",
   price: "20$"
  },
  {
   id: "2", 
   name: "Scarf",
   description: "A great and warm scarf",
   rating: 4.5,
   categoryId: "1",
   price: "15$"
  },
  {
   id: "3", 
   name: "Gloves",
   description: "Great and warm gloves",
   rating: 4,
   categoryId: "1",
   price: "10$"
  },
  {
   id: "4", 
   name: "Boots",
   description: "Great and warm boots",
   rating: 4.3,
   categoryId: "2",
   price: "30$"
  },
  {
   id: "5", 
   name: "Shoes",
   description: "Great shoes",
   rating: 4.8,
   categoryId: "2",
   price: "25$"
  }
 ],
 categories: [
  {
   id: "1",
   name: "Clothes"
  },
  {
   id: "2",
   name: "Shoes"
  }
 ]
};

App.templates = {
 product: '<div class="product">\
    <div class="product_head">{{name}}</div>\
    <div class="product_body">\
     <div class="product_description">{{description}}</div>\
     <div class="product_footer">\
      <div class="product_price">{{price}}</div>\
      <div class="product_rating">{{rating}}</div>\
     </div>\
    </div>\
   </div>',
}

App.menu = (function () {
 var category = qs('#category');
 var price_from = qs('#price_from');
 var price_to = qs('#price_to');
 var sorter = qs('#sorter');

 function addCategories () {  
  App.fixtures.categories.forEach(function (val) {  
   category.innerHTML+= '<option value="' + val.id + '">' + val.name +'</option>';
  })
 }

 function initListeners (callbackObject) {
  category.addEventListener("change", callbackObject.categoryChange);
  price_to.addEventListener("change", callbackObject.priceChage);
  price_from.addEventListener("change", callbackObject.priceChage);
  sorter.addEventListener("change", callbackObject.sorterChange);
 }

 function setStartValues (values) {
  price_to.value = values.price_to;
  price_from.value = values.price_from;
  sorter.dispatchEvent(new Event('change'));
 }

 return {
  addCategories: addCategories,
  initListeners: initListeners,
  setStartValues: setStartValues
 }
})();


App.Product = (function () {
 var Product = function (data) {
  for (var i in data) {
   this[i] = data[i];
  }
  this.template = App.templates.product;
  this.category = App.fixtures.categories.filter(function (val) {
   return val.id === data.categoryId;
  })[0];
 };

 Product.prototype.getHTML= function () {
  var reg = /{{([A-Za-z0-9\+\-\_\,\ ]+)}}/g;
  var self = this;
  return this.template.replace(reg, function (substring) {
   return self[substring.split(/{|}/).join("")];
  });
 } 

 return Product;
 
})();


App.main = (function () {
 var items = []; 
 var filtered = [];
 var minPrice = Infinity;
 var maxPrice = 0;
 var currentSort = "Name";
 createItems();
 App.menu.addCategories();
 App.menu.initListeners({
  categoryChange: categoryChange,
  priceChage: priceChage,
  sorterChange: sorterChange
 });
 App.menu.setStartValues({
  price_from: minPrice,
  price_to: maxPrice
 })

 function renderItems (itemArray) {
  var itemEl = qs('#items');
  var html = "";
  itemArray.forEach(function (item) {
   html+= item.getHTML();
  });
  itemEl.innerHTML = html;
 }

 function createItems () {  
  App.fixtures.products.forEach(function (obj) {
   var product = new App.Product(obj)
   items.push(new App.Product(obj));
   minPrice = minPrice > parseInt(product.price) ? parseInt(product.price) : minPrice;
   maxPrice = maxPrice < parseInt(product.price) ? parseInt(product.price) : maxPrice;
  });
  filtered = items;
 }

 function sorterChange () {
  var val = currentSort = this.value;
  sortBy(val);
  renderItems(filtered);
 }

 function priceChage () {
  var min = parseInt(qs('#price_from').value);
  var max = parseInt(qs('#price_to').value);
  if (min > max) {
   qs('#price_to').value = min;
  }
  filtered = items.filter(function (val) {
   return (parseInt(val.price) >= min) && (parseInt(val.price) <= max);
  });
  sortBy(currentSort);
  renderItems(filtered);
 }

 function sortBy (val) {
  var sorters = {
    "Name": function (val1, val2) {
     var a = val1.name,
      b = val2.name;
     return a === b ? 0 : a > b ? -1 : 1;
    },
    "Price": function (val1, val2) {
     var a = parseInt(val1.price),
      b = parseInt(val2.price);
     return a === b ? 0 : a > b ? -1 : 1;
    },
    "Rating": function (val1, val2) {
     var a = parseInt(val1.rating),
      b = parseInt(val2.rating);
     return a === b ? 0 : a > b ? -1 : 1;
    }
   };
   filtered.sort(sorters[val]);
 }

 function categoryChange () {
  var val = this.value;
  filtered = items.filter(function (item) {
   return item.categoryId === val;
  });
  renderItems(filtered);
 }


})();

//Например, так можно создать хранилище методов (фильтрации, сортировки и т.д.) и отфильтрованных/отсортированных данных


// App.store = (function () {
// 	var data = [];
// 	var filters = {
// 		minPrice: 30,
// 		minSize: 38
// }
// 	 function setData () {  
// 	  App.fixtures.products.forEach(function (obj) {
// 	   var product = new App.Product(obj)
// 	   data.push(new App.Product(obj));
// 	  });
// 	 }
	 
// 	 function setFilter (filter, value) {
// 	 	filters[filter] = value;
// 	 	onFilterChange();
// 	 }
  
//   function getData() {

//   }
//   return {
//   	getData: getData;
//   }
//  }

// })();