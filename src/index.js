
let tools = {
    getType (data){
        let _type = Object.prototype.toString.call(data),
            startIndex = _type.indexOf(' '),
            endIndex = _type.indexOf(']');
        return _type.substring((startIndex + 1), endIndex).toLowerCase();
    },
    deepClone (obj){
    	if(tools.getType(obj) != 'object' || tools.getType(obj) != 'array'){
    		return obj;
    	}

    	return JSON.parse(JSON.stringify(obj));
    },
    isEmpty (val) {
    	switch(tools.getType(val)){
    		case "object":
    			if(Object.getOwnPropertyNames(val).length === 0){
    				return true;
    			}
    			break;
    		case 'array':
    			if(val.length === 0 || (Object.getOwnPropertyNames(val).length === 1)){
    				return true;
    			}
    			break;
    		default:
    			return val === '' || val === null || isNaN(val) || val === false;
    	}
    },
    toUnique (data){
    	let arr = [];
    	if(tools.getType(data) === 'array'){
    		arr = [ ...new Set(data) ];
    	}

    	return arr;
    }
}
