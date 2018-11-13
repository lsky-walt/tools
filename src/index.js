
/**
 * 一个工具类
 * @type {Object}
 */
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
    },
    ajax (options){
    	/**
    	 * ajax promise 重封装
    	 * @author lsky
    	 * @param  {[Promise]} (resolve, reject)       [promise 自带方法	]
    	 * @param  {[Object]} options    [ajax参数]
    	 * @return {[Promise]}           [返回标准promise]
    	 */
    	return new Promise((resolve, reject) => {
    		options = options || {};
		    options['type'] = (options['type'] || 'GET').toUpperCase();
		    options['dataType'] = options['dataType'] || 'json';
		    let arr = [],
		    	params = ``;
		    for (const [key, val] of Object.entries(options['data'])){
		    	arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
		    }

		    params = arr.join("&");


		    // 创建
		    let xhr = null;
		    if(window.XMLHttpRequest){
		        xhr = new XMLHttpRequest();
		    }else{
		        alert("不支持IE6以下版本的浏览器");
		    }

		    xhr.onreadystatechange = () => {
		        if(xhr.readyState == 4){
		            let _status = xhr.status;
		            if(_status >= 200 && _status < 300){
		            	resolve(xhr);
		            }else{
		            	reject(_status);
		            }
		        }
		    };

		    if(options['type'] == 'GET'){
		        xhr.open('GET', `${options['url']}?${params}`, true);
		        xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        xhr.send(null);
		    }else if(options['type'] == 'POST'){
		        xhr.open('POST', options['url'], true);
		        xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
		        xhr.send(params);
		    }
    	})
	},
	debounce (func, wait, immediate){
		/**
		 * @desc 函数防抖
		 * @params func 函数
		 * @params wait 延迟执行毫秒数
		 * @params immediate true 表示立即执行版， false 非立即执行
		 */
		let timeout;
		return function (){
			let contenxt = this,
				args = arguments;

			if(immediate){
				let callNow = !timeout;
				timeout = setTimeout(() => {
					timeout = null;
				}, wait);
				if(callNow) func.apply(contenxt, args);
			}else{
				timeout = setTimeout(() => {
					func.apply(contenxt, args);
				}, wait);
			}
		}
	}
}
