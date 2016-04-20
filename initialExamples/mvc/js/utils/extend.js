define(function () {
    return function extend (Parent, Child, mix) {
        var i, 
            proto = Child.prototype;
        
        
        Parent = Parent || Object;
        
        Child.prototype = Object.create(Parent.prototype);
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype; 
        
        for (i in proto) {
            Child.prototype[i] = proto[i];            
        }  
        
        if (typeof mix === "function") {
            for (i in mix.prototype) {
                Child.prototype[i] = mix.prototype[i];            
            }      
        } else {
            for (i in mix) {
                Child.prototype[i] = mix[i];            
            }  
        }       
        
        return Child;
    }
});
