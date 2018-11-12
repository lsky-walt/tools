
let tools = {
    getType (data){
        let _type = Object.prototype.toString.call(data),
            startIndex = _type.indexOf(' '),
            endIndex = _type.indexOf(']');
        return _type.substring((startIndex + 1), endIndex);
    }
}

console.log(tools.getType(new Date()));