define(['utils/extend', 'utils/event-emiter', 'utils/object'], function (extend, Emiter, objUtils) {
    
var Model = function (data, store, type) {
        Model.superclass.constructor.call(this);
        this.store = store;   
        if (Array.isArray(type)) {
            this.type = null;
            this.types = type;
        } else this.type = this.type || type;

        this._initData(data, store);
        this.id = this._getData("id");
        this.subscribeToStoreEvents(this.store);
    };

    Model.prototype._initData = function (data, store) {            
        if (data.id && data !== store.getByID(this.type, data.id)) {
            this._data = store.getByID(this.type, data.id);
        } else if (!data.id && data !== store.getAll(this.type)) {
            this._data = store.getAll(this.type);
        } else {
            this._data = data;
        }
    };

    Model.prototype._setData = function  (key, value) {             
        this._data[key] = value;            
    };

    Model.prototype._getData = function (key) {
        return this._data[key];
    };

    Model.prototype._onUpdate = function (id) {
        this.emitEvent("update");
    };

    Model.prototype._onCreate = function (data, type) {
        this.emitEvent('newitem', [data, type]);
    };

    Model.prototype._onDelete = function (type, id) {
        if (id === this._data.id) {
            this.destroy();
            this.emitEvent("delete")
        } else {
            this.emitEvent('remove');   
        }
    };

    Model.prototype._onStoreUpdate = function (data) {
        var newData;          
        newData = objUtils.dataWrap();
        for (var i in data) {
            if (data[i] !== this._data[i]) {
                newData[i] = data[i];
            }
        }                  
        this._data = data;
        this.emitEvent("update", [newData]);       
    };

    Model.prototype._onDelete = function (type, id) {
        this._data = null;		
        this.emitEvent("delete");
    };

    Model.prototype._updateInStore = function () {
        this.store.update(this.type, this.getId());
    }

    Model.prototype.subscribeToStoreEvents = function (store) {
        var type = this.type || this.types;
        if (!Array.isArray(this.type) && this.id) {
            type = [this.type];
        }
        for (var i in type) {
            this.store.subscribe("created", this._onCreate.bind(this), this.id, type[i]);
            this.store.subscribe("updated", this._onUpdate.bind(this), this.id, type[i]);
            this.store.subscribe("deleted", this._onDelete.bind(this), this.id, type[i]);
            this.store.subscribe("allready", this._onStoreUpdate.bind(this), this.id, type[i]);
        }        
       
    };

    Model.prototype.getContent = function (query) {
        var cume;
        if (query && typeof query === "string" && this._data[query]) {
            if (typeof this._data[query] !== "object") {
                return this._data[query];
            }
           return objUtils.deepCopy(this._data[query]);
        } else if (typeof query === "object") {
            cume = objUtils.dataWrap(this._data);
            for (var i in data) {
                for (var j in query) {
                    if (query[j] === data[i][j] && i === j) {
                        cume[i] = objUtils.deepCopy(data[i]);
                    }
                }
            }
            return cume;
        } else return objUtils.deepCopy(this._data);
    };

     Model.prototype.setContent = function (data) {
        for (var i in data) {
            if (this._getData(i)) {
                this._setData(i, data[i]);
            }
        }
        this._updateInStore();
    };

    Model.prototype.create = function (data, type) {
        this.store.create(data, type);
    };

    Model.prototype.getId = function () {
        return this._getData("id");
    };

    Model.prototype.getType = function () {
        return this.type;
    };

    Model.prototype.destroy = function () {
        this.store.remove(this.type, this.id);
    };
    
    extend(Emiter, Model); 
    
    return Model;

});