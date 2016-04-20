var APP = APP || {};

APP.dataStore = (function () {
  var data, requestOptions = {
      get: {
        type: 'GET',
        link: 'http://localhost:3000/data'
      },
      put: {
        type: 'POST',
        link: 'http://localhost:3000/data'
      }
  };

  function handleNewData (text, event, callback) {
      data = JSON.parse(text);
      if (callback) {
        callback();
      }    
  }

  function getData () {
    return data;
  }

  function update (callback) {
    APP.request.create(requestOptions.get, "", function (text, event) {
      handleNewData(text, event, callback);
    });
  }

  function send (data, callback) {
    var newData;
    if (Array.isArray(data) || typeof data !== "object") {
      throw new Error("Data is not an object");
      return;
    }
    newData = JSON.stringify(data);
    APP.request.create(requestOptions.put, newData, function (text, event) {
      callback();
    });
  }

  function create () {
      this.getData = getData;
      this.update = update;
      this.send = send;
  }
  return {
    create: create,
  }
})();