define(function () {

    var Controller  = function (view, model) {
        this.view = view;
        this.model = model;

        this._initEvents();
    }; 

    Controller.prototype._onItemDelete = function () {
        this.removeItem();
    };

    Controller.prototype._onViewUpdate = function () {
        this.updateModel();
    };	

    Controller.prototype._onModelUpdate = function () {
        this.updateView();            
    };

    Controller.prototype._onCreate = function (data, type) {
        this.create(data, this.model.type);
    };	

    Controller.prototype._onNewItem = function (data, type) {
        this.addNewItem(data, type);
    };

    Controller.prototype._onDelete = function () {
        this.view.destroy();
        this.destroy();
    };

    Controller.prototype._initEvents = function () {
        var self = this;

        this.view.subscribe('create', function (data) {
            self._onCreate(data);
        });
        this.view.subscribe("update", function () {
            self._onViewUpdate();
        });                       
        this.model.subscribe("remove", function (key, value) {          
            self._onItemRemove(key, value);
        });
        this.view.subscribe("delete", function (data) {
            self.model.destroy();
        }); 


        this.model.subscribe('newitem', function (data, type) {
            self._onNewItem(data, type);
        });
        this.model.subscribe("update", function (key, value) {          
            self._onModelUpdate(key, value);
        });
        this.model.subscribe("remove", function (key, value) {          
            self._onItemRemove(key, value);
        });
        this.model.subscribe("delete", function () {
            if (self.view) {
                    self.view.destroy();   
                } 
            self.destroy();
        });


        this.subscribeToModelEvents();
        this.subscribeToViewEvents();

    };

    Controller.prototype.subscribeToViewEvents = function () {
       
    };

    Controller.prototype.subscribeToModelEvents = function () {
                 
    };    

    Controller.prototype.create = function (data, type) {
        this.model.create(data, type);
    };

    Controller.prototype.updateModel = function () {
      this.model.setContent(this.view.getContent());  
    };

    Controller.prototype.updateView = function () {
        this.view.setContent(this.model.getContent());		
    };

    Controller.prototype.removeItem = function (id) {
        this.view.remove(id);
        this.model.remove(id);
    };

    Controller.prototype.destroy = function () {		
        this.view = null;
        this.model = null;
    };
    
    return Controller;	
});