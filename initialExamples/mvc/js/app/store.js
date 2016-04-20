define(['utils/xhr', 'utils/event-emiter', 'utils/extend'], function (xhrUtils, Emiter, extend){

    var Store = function (dataTypes) {
        Store.superclass.constructor.call(this);
        
        this.data = {};
        this.dataTypes = dataTypes;

        this.getAllFromServer();
    };

    Store.prototype.getAllFromServer = function () {
        var self = this,
            ready = 0;

        this.dataTypes.forEach(function(type) {
            xhrUtils.getAll(type, function (data) {
                ready++;
                self.data[type] = data;
                if (ready === self.dataTypes.length) {
                    self.emitEvent("allready", [data]);
                }
             }, self.failedRequest);
        });
    };

    Store.prototype.getAll = function (type) {
        if (type && this.data[type]) {
            return this.data[type];
        } else {
            return this.data;
        }
        return this.data[type];
    };

    Store.prototype.getByID = function (type, id) {
        if (type && this.data[type]) {
            return this.data[type].find(function (obj) {
                return obj.id === id;
            });
        } else {
            return null;
        }        
    };

    Store.prototype.create = function (data, type, callback) {
        var self = this;
        xhrUtils.create(data, type, function (response) {
            self.data[type].push(response);
            if (callback) {
                callback(self.getByID(type, response.id));
            }            
            self.emitEvent("created", [response, type], null, type)
        }, function (response) {
            self.failedRequest(this);
        })
    };

    Store.prototype.update = function (type, id) {
        var self = this;
        xhrUtils.update(this.getByID(type, id), id, type, function () {
            self.emitEvent("updated", [null], id, type);
        }, function (response) {
            self.failedRequest(this);
        });
    };

    Store.prototype.remove = function (type, id) {
        var self = this;
        var item = this.data[type].find(function (val) {
            return val.id === id;
        });

        xhrUtils.deleteRecord(id, type, function (data) {
            self.emitEvent("deleted", [type, id], id, type);
            self.data[type] = self.data[type].filter(function (val) {
                return val.id !== id;
            });		
        }, function (response) {
            self.failedRequest(this);
        });
    };

    Store.prototype.failedRequest = function (request) {
        this.emitEvent('requestFailed', [request]);
    };
    
    extend(Emiter, Store);
    
    return Store;

})