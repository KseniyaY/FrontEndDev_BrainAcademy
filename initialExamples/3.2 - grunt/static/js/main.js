var APP = APP || {};

(function () {
  APP.start = function () {
    APP.dataStore.create();
    APP.view.create();
  }
  window.onload = APP.start()
})();


