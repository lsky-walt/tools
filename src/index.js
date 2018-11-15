
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
	},
	throttle (func, wait){
		/**
		 * @desc 函数节流
		 * @param func 函数
		 * @param wait 延迟执行毫秒数
		 */
		let throttleTimeout;
		return function () {
			let throttleContext = this,
				throttleArgs = arguments;

			if(!throttleTimeout){
				throttleTimeout = setTimeout(() => {
					throttleTimeout = null;
					func.apply(throttleContext, throttleArgs);
				}, wait)
			}
		}
	},
	getRem (){
        if (document.documentElement) {
            var _temp = window.getComputedStyle(document.documentElement)["fontSize"];
            _temp = _temp.substring(0, _temp.indexOf("px"));
            return Number(_temp);
        } else {
            var _temp = window.getComputedStyle(document.body)["fontSize"];
            _temp = _temp.substring.substring(0, _temp.indexOf("px"));
            return Number(_temp);
        }
    },
    checkNum (str, flag){ 
        if(flag == 'blur'){
            if(str.indexOf('.') === (str.length - 1)){
                return str.substr(0, str.length - 1);
            }else{
                return str;
            }
        }
        // flag为空 或者 为input change 
        // 初始化一个空字符串
        var _ret = '';
        //  如果第一个为 “.” 则清除
        if( str !=''&& str.substr(0,1) == '.' ){  
            return _ret; 
        }
        //解决 粘贴不生效 
        _ret = str.replace(/^0*(0\.|[1-9])/, '$1'); 
        //清除“数字”和“.”以外的字符
        _ret = _ret.replace(/[^\d.]/g,"");
        //只保留第一个. 清除多余的    
        _ret = _ret.replace(/\.{2,}/g,".");        
        _ret = _ret.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        //只能输入两个小数       
        _ret = _ret.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');   
        
        //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的数字
        if(_ret.indexOf(".")< 0 && _ret !=""){  
            if(_ret.substr(0,1) == '0' && _ret.length == 2){  
                _ret= _ret.substr(1,_ret.length);      
            }  
        }

        return _ret;
	}
}
