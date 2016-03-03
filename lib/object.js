var util = require("util");

/**
 * 合并对象
 * @param {Object} Obj1
 * @param {Object} Obj2
 * @returns {Object}
 */
function merge(Obj1, Obj2) {
    if (typeof Obj1 != 'object') {
        return {};
    }
    if (typeof Obj2 != 'object') {
        return Obj1;
    }
    for (var index in Obj2) {
        if (Obj2.hasOwnProperty(index)) {
            Obj1[index] = Obj2[index];
        }
    }

    return Obj1;
}

/**
 * 将对象转换成数组
 *
 * @param {Object} obj
 * @param {String=} key
 * @returns {Boolean | Array}
 */
function object2array(obj, key) {
    if (typeof obj != "object") {
        return false;
    }
    if (key && typeof key != "string") {
        return false;
    }

    var arr = [];
    var index;
    if (key) {
        for (index in obj) {
            if (obj.hasOwnProperty(index)) {
                obj[index][key] = index;
                arr.push(obj[index]);
            }
        }
    } else {
        for (index in obj) {
            if (obj.hasOwnProperty(index)) {
                arr.push(obj[index]);
            }
        }
    }

    return arr;
}

/**
 * 重命名对象中key
 * @param {Object} obj
 * @param {String | Object} oldKey
 * @param {String | Object} newKey
 * @returns {Object}
 */
function renameKey(obj, oldKey, newKey) {
    var retObject = {};
    var index, ptr;

    if (typeof obj != "object") {
        return retObject;
    }

    var oldKeyType = typeof oldKey;
    var newKeyType = typeof newKey;
    if (oldKeyType == "string"
        && newKeyType == "string") {
        for (index in obj) {
            if (obj.hasOwnProperty(index)) {
                if (index == oldKey) {
                    retObject[newKey] = obj[index];
                } else {
                    retObject[index] = obj[index];
                }
            }
        }
    } else if (oldKeyType == "object"
        && newKeyType == "object"
        && oldKey.hasOwnProperty("length")
        && newKey.hasOwnProperty("length")
        && oldKey.length <= newKey.length
        ) {
        for (index in obj) {
            if (obj.hasOwnProperty(index)) {
                ptr = oldKey.indexOf(index);
                if (ptr >= 0) {
                    retObject[newKey[ptr]] = obj[index];
                } else {
                    retObject[index] = obj[index];
                }
            }
        }
    }

    return retObject;
}

/**
 * 保留指定字段
 * @param {Object} obj
 * @param {Array} keyList
 * @returns {*}
 */
function withKeys(obj, keyList) {
    var retObject = {};
    var index, ptr;

    if (typeof obj != "object") {
        return retObject;
    }

    if (typeof keyList != "object"
        || !keyList.hasOwnProperty("length")
        || keyList.length <= 0) {
        return obj;
    }

    for (index in obj) {
        if (obj.hasOwnProperty(index)) {
            ptr = keyList.indexOf(index);
            if (ptr >= 0) {
                retObject[index] = obj[index];
            }
        }
    }

    return retObject;
}

/**
 * 移除指定字段
 * @param {Object} obj
 * @param {Array} keyList
 * @returns {*}
 */
function withoutKeys(obj, keyList) {
    var retObject = {};
    var index, ptr;

    if (typeof obj != "object") {
        return retObject;
    }

    if (typeof keyList != "object"
        || !keyList.hasOwnProperty("length")
        || keyList.length <= 0) {
        return obj;
    }

    for (index in obj) {
        if (obj.hasOwnProperty(index)) {
            ptr = keyList.indexOf(index);
            if (ptr >= 0) {
                continue;
            }
            retObject[index] = obj[index];
        }
    }

    return retObject;
}

/**
 * 检测对象是否是空对象(不包含任何可读属性)。 //如你上面的那个对象就是不含任何可读属性
 * 方法只既检测对象本身的属性，不检测从原型继承的属性。
 *
 * @param {Object} Obj
 * @returns {boolean}
 */
function isOwnEmpty(Obj) {
    for (var name in Obj) {
        if (Obj.hasOwnProperty(name)) {
            return false;
        }
    }
    return true;
}

/**
 * 检测对象是否是空对象(不包含任何可读属性)。
 * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
 *
 * @param {Object} Obj
 * @returns {boolean}
 */
function isEmpty(Obj) {
    for (var name in Obj) {
        return false;
    }
    return true;
}

function sort(Obj) {

}

function sortKey(Obj) {
    var keys = [], retObj = {};
    for (var i in Obj) {
        if (Obj.hasOwnProperty(i)) {
            keys.push(i);
        }
    }
    keys.sort();
    for (var j = 0, len = keys.length; j < len; j++) {
        retObj[keys[j]] = Obj[keys[j]];
    }
    return retObj;
}

function copyObject(GlobalObj, Obj) {

    var objName;
    if (typeof GlobalObj != "object") {
        GlobalObj = {};
    }
    for (objName in Obj) {
        if (Obj.hasOwnProperty(objName)) {
            if (util.isArray(Obj[objName]) || typeof Obj[objName] != "object") {
                GlobalObj[objName] = Obj[objName];
            } else {
                GlobalObj[objName] = copyObject(GlobalObj[objName], Obj[objName]);
            }
        }
    }
    return GlobalObj;
}

module.exports = {
    merge: merge,
    object2array: object2array,

    renameKey: renameKey,
    withKeys: withKeys,
    withoutKeys: withoutKeys,

    isOwnEmpty: isOwnEmpty,
    isEmpty: isEmpty,

    sort: sort,
    sortKey: sortKey,
    copyObject: copyObject
};