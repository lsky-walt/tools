
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
	},
	loadImageAsync (url){
		return new Promise(function (resolve, reject) {
			const image = new Image();

			image.onload = function () {
				image.onload = null;
				resolve(true);
			}
			image.onerror = function (){
				image.onerror = null;
				reject(`加载失败，失败图片地址${url}`);
			}

			image.src = url;
		})
	},
	getBrowser: () => {
        const ua = window.navigator.userAgent || '',
            isAndroid = /android/i.test(ua),
            isIos = /iphone|ipad|ipod/i.test(ua),
            isWechat = /MicroMessenger\/([\d.]+)/i.test(ua),
            isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua),
            isQQ = /qq\/([\d.]+)/i.test(ua),
            isQzone = /qzone\/.*_qz_([\d.]+)/i.test(ua),
            // 安卓 chrome 浏览器，很多 app 都是在 chrome 的 ua 上进行扩展的
            isOriginalChrome = /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(ua) && isAndroid && ua.indexOf('Version') > 0,
            // chrome for ios 和 safari 的区别仅仅是将 Version/<VersionNum> 替换成了 CriOS/<ChromeRevision>
            // ios 上很多 app 都包含 safari 标识，但它们都是以自己的 app 标识开头，而不是 Mozilla
            isSafari = /safari\/([\d.]+)$/i.test(ua) && isIos && ua.indexOf('Crios') < 0 && ua.indexOf('Mozilla') === 0;

        return {
            isAndroid,
            isIos,
            isWechat,
            isWeibo,
            isQQ,
            isQzone,
            isOriginalChrome,
            isSafari,
        };
	},
	/**
	 * 生成浏览器跳转APP scheme 链接
	 * @author lsky
	 * @param  {[Object]} config [path(APP 路径), param(APP 所需参数), protocal(APP scheme 标识)]
	 * @return {[String]}        [scheme 链接]
	 */
	buildScheme: (config) => {
        const { path, param, protocol } = config;
        const query = typeof param !== 'undefined'
          ? Object.keys(param).map(key => `${key}=${param[key]}`).join('&')
          : '';
      
        return `${protocol}://${path}?${query}`;
	},
	/**
     * 生成H5跳转APP 链接
     * @param {Object} config 配置  见buildScheme说明
     * @param {Object} options [intent[scheme, package], fallback]
     */
    generateIntent(config, options) {

        const { intent, fallback } = options;
        const intentParam = Object.keys(intent).map(key => `${key}=${intent[key]};`).join('');
        const intentTail = `#Intent;${intentParam}S.browser_fallback_url=${encodeURIComponent(fallback)};end;`;
        let urlPath = buildScheme(config, options);
      
        urlPath = urlPath.slice(urlPath.indexOf('//') + 2);
      
        return `intent://${urlPath}/${intentTail}`;
    }
}
