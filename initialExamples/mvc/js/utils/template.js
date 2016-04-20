define(function () {    
    return function addCls (template, classes) {
        return template.replace(/{{cls:([A-Za-z0-9\+\-\_\,\ ]+)}}/g, function (sub) {
        	var t;
        	if (sub.indexOf(' ') !== -1) {
        		t = [];
        		sub.split(' ').forEach(function(val) {
        			t.push(val.indexOf(':') !== -1 ? val.slice(val.indexOf(':') + 1) : val.slice(0, val.indexOf('}')));
        		});        		
        		t = t.map(function(val) {
        			return classes[val] || "";
        		}).join(" ");
        		return ' class="' + t + '"';
        	} else {
        		return classes[sub.match(/\:{0}(\w+)(?=})/)[0]] ? ' class="' + classes[sub.match(/\:{0}(\w+)(?=})/)[0]] + '"' : '';
        	}
            
        });
    }
});