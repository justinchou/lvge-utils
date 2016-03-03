var util = require("util");

/**
 * 将数组转换成对象
 *
 * @param {Array} arr
 * @param {String} key
 * @returns {Boolean | Object}
 */
function array2object(arr, key){

//    if(typeof arr != "object" || !arr.hasOwnProperty("length")){}

    if(!util.isArray(arr) || !key || typeof key != "string"){
        return false;
    }

    var obj = {};
    for(var index in arr){
        if(arr.hasOwnProperty(index)){
            (function(index){
                var k  = arr[index][key];
                obj[k] = arr[index];
            })(index);
        }
    }

    return obj;
}

module.exports = {
    "array2object": array2object
};