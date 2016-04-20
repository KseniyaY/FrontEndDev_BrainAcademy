define(function () {    
    var Emiter = function () {
        this.events = {};
    };

    Emiter.prototype.emitEvent = function (event, args, id, type) {
        var self = this;
        var ev = this.events[event];	
        // id = id || this.id;
        // type = type || this.type;	
        if (ev) {
            // if (type && ev[type]) {
            //     if (id && ev[type][id]) {
            //         ev[type][id].handlers.forEach(function(handler) {
            //             handler.apply(self, args);
            //         });
            //         return;
            //     }
            //     if (ev[type].handlers) {
            //         ev[type].handlers.forEach(function(handler) {
            //             handler.apply(self, args);
            //         });
            //     }                
            //     return;
            // }
            // if (id && ev[id]) {
            //     ev[id].handlers.forEach(function(handler) {
            //             handler.apply(self, args);
            //         });
            //     return;
            // }
            ev.handlers.forEach(function(handler) {
                handler.apply(self, args);
            });
        }
    };

    Emiter.prototype.subscribe = function (event, handler, id, type) {
        this.events[event] = this.events[event] || {};
        // id = id || this.id;
        // type = type || this.type;
        // if (type) {
        //     if(id) {
        //         this.events[event][type] = this.events[event][type] || {};
        //         this.events[event][type][id] = this.events[event][type][id] || {};
        //         this.events[event][type][id].handlers = this.events[event][type][id].handlers || [];
        //         this.events[event][type][id].handlers.push(handler);
        //         return;
        //     }
        //     this.events[event][type] = this.events[event][type] || {};
        //     this.events[event][type].handlers = this.events[event][type].handlers || [];
        //     this.events[event][type].handlers.push(handler);
        //     return;
        // }
        // if (id) {
        //     this.events[event][id] = this.events[event][id] || {};
        //     this.events[event][id].handlers = this.events[event][id].handlers || [];
        //     this.events[event][id].handlers.push(handler);
        //     return;
        // }
        this.events[event].handlers = this.events[event].handlers || [];
        this.events[event].handlers.push(handler);
    };
    
    return Emiter;
});