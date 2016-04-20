var APP = APP || {};

APP.request = (function () {
  function makeRequest (options, data, callback) {    
    var request = new XMLHttpRequest();
    request.addEventListener('load', function (event) {
        if (this.status === 200 || this.status === 201) {
          callback(this.responseText, event);      
        } else {
          throw new Error('Error retrieveing data. ' + this.status + ', ' + this.responseText);
        }       
      });
    request.open(options.type, options.link);    
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(data);
    return request;
  }
  return {
    create: makeRequest
  }
})();