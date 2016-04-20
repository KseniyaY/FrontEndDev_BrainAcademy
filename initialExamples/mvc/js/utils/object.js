define(function () {

	 function deepCopy (object) {
        var copyObject = this.dataWrap(this._data);

        copy(object, copyObject);
        return copyObject;      
    }

  	function copy (obj, cObj) {
        for (var i in obj) {
            if (typeof obj[i] === "object" && obj[i] !== null) {
                cObj[i] = dataWrap(obj[i]);
                copy(obj[i], cObj[i]);
            } else {
                cObj[i] = obj[i];
            }
        }
    }        

    function dataWrap (data) {
        return Array.isArray(data) ? [] : {}; 
    }

    function merge (obj1, obj2) {
		var merge = {};		
		copy(obj1, merge);
		copy(obj2, merge);
		return merge;
	}

	function deepMerge (obj1, obj2) {
		var cObj1 = deepCopy(obj1),
			cObj2 = deepCopy(obj2);
			copy(cObj2, cObj1);
			return cObj2;
	}

	return {
		dataWrap: dataWrap,
		copy: copy,
		deepCopy: deepCopy,
		merge: merge,
		deepMerge: deepMerge
	}
});