var APP = APP || {};

APP.view = (function () {
  
  var dataTable;
  var config = {};

  function render () {     
    var fragment = document.createDocumentFragment();
    var data = renderPageNav();
      
    for (var i in data) {
         for (var key in data[i]) {
            if (key !== "id") {
                var templateCols;
                var templateRow = document.createElement('tr');
                templateCols = '<td>' + key + '</td>' + '<td>' + data[i][key] + '</td>';      
                templateRow.innerHTML = templateCols;
                fragment.appendChild(templateRow);    
            }          
        } 
    }     
    dataTable.innerHTML = "";
    dataTable.appendChild(fragment);    
  }

  function update () {
    APP.dataStore.update(render);
  }

  function sendAndUpdate (name, value) {
    var data = {};
    data[name] = value;
    config.currentPage = config.pageCount;
    APP.dataStore.send(data, update);
  }

  function renderPageNav () {
    var nav = document.getElementById('pagesblock');
    var storeData = APP.dataStore.getData();
    var dataSize = Object.keys(APP.dataStore.getData());
    var data = {}; 
    var startPoint, 
        endPoint;

    nav.innerHTML = "";

    if (!config.currentPage) {
      config.currentPage = 1;
    }

    if (dataSize.length > config.pagesize) {
      config.pageCount = Math.ceil(dataSize.length/config.pagesize);
    } else config.pageCount = 1;

    for (var i = 1; i <= config.pageCount; i++) {
      var link;
      if (i !== config.currentPage) {
        link = document.createElement('a');
        link.addEventListener('click', function () {
          config.currentPage = parseInt(this.innerHTML);
          render();
        });
      } else link = document.createElement('span');
     
      link.innerHTML = i;
      nav.appendChild(link);
    } 

    startPoint = ((config.currentPage - 1) * config.pagesize) - 1;
    endPoint = config.currentPage * config.pagesize <= dataSize.length ? config.currentPage * config.pagesize : dataSize.length;

    for (var i in dataSize) {
      if (i > startPoint && i < endPoint) {
        data[dataSize[i]] = storeData[dataSize[i]];
      };
    }

    return data;
  }

  function create () {
    var get = document.getElementById('get');
    var send = document.getElementById('send');
    var addDataName = document.getElementById('addDataName');
    var addDataValue = document.getElementById('addDataValue');
    var pagesize = document.getElementById('pagesize');

    dataTable = document.getElementById('datatable');
    config.pagesize = parseInt(pagesize.value);

    pagesize.addEventListener('change', function () {
      config.pagesize = parseInt(pagesize.value);
      config.currentPage = 1;
      render();
    });
    get.addEventListener('click', update);    
    send.addEventListener('click', function () {
      sendAndUpdate(addDataName.value, addDataValue.value);
      addDataName.value = addDataValue.value = '';
    });
    update();
  } 

  return {
    create: create,
    update: update
  }
})();
