var util = require("util");
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var logger = require('pomelo-logger').getLogger(__filename, "Module LvGeUtils");
//var logger = console;

var SeedRandom;
try {
    SeedRandom = require("./SeedRandom/SeedRandom.node");
} catch (e) {
    if (logger) {
        logger.warn("SeedRandom.node Is Not Exists Check If Configured! [%s]", e);
    } else {
        console.warn("SeedRandom.node Is Not Exists Check If Configured! [%s]", e);
    }
    SeedRandom = require("./SeedRandom/SeedRandom.js");
}

function getFileInfo(path_string) {
    var suffix, realPath;

    var stat = fs.existsSync(path_string);
    if (!stat) {
        suffix = ".js";
        realPath = path_string + suffix;
        stat = fs.existsSync(realPath);
        if (!stat) {
            suffix = ".json";
            realPath = path_string + suffix;
            stat = fs.existsSync(realPath);
            if (!stat) {
                suffix = ".node";
                realPath = path_string + suffix;
                stat = fs.existsSync(realPath);
                if (!stat) {
                    suffix = "";
                }
            }
        }
    } else {
        suffix = path.extname(path_string);
        realPath = path_string;
    }

    switch (suffix.toLowerCase()) {
        case ".js":
            suffix = "js";
            break;
        case ".json":
            suffix = "json";
            break;
        case ".node":
            suffix = "node";
            break;
        default :
            suffix = "";
            break;
    }

    return {
        "suffix": suffix,
        "realPath": realPath
    };
}

function readConfig(path) {
    var config = null;

    var fileInfo = getFileInfo(path);
    var suffix = fileInfo.suffix;
    var realPath = fs.realpathSync(fileInfo.realPath);

    switch (suffix){
        case "node":
        case "js":
            config = require(realPath);
            break;
        case "json":
            config = JSON.parse(fs.readFileSync(realPath, 'utf8'));
            break;
        default :
            config = {};
            break;
    }

    return config;
}

function loadFile(path) {
    return readConfig(path);
}

/**
 * 去除字符串左边指定字符串
 * @param {String} str
 * @param {String=} targetStr
 * @returns {*}
 */
function ltrim(str, targetStr) {
    var retStr = "";
    var regStr;

    if (typeof str != "string") {
        return retStr;
    }

    if (typeof targetStr != "string" || !targetStr) {
        targetStr = "\\s";
    }

    regStr = "^" + targetStr + "*(.*?)";
    regStr = new RegExp(regStr);

    str = str.replace(regStr, "$1");
    return str;
}

/**
 * 去除字符串右边指定字符串
 * @param {String} str
 * @param {String=} targetStr
 * @returns {*}
 */
function rtrim(str, targetStr) {
    var retStr = "";
    var regStr;

    if (typeof str != "string") {
        return retStr;
    }

    if (typeof targetStr != "string" || !targetStr) {
        targetStr = "\\s";
    }

    regStr = "(.*?)" + targetStr + "*$";
    regStr = new RegExp(regStr);

    str = str.replace(regStr, "$1");
    return str;
}

/**
 * 去除字符串两边指定字符串
 * @param {String} str
 * @param {String=} targetStr
 * @returns {*}
 */
function trim(str, targetStr) {
    var retStr = "";
    var regStr;

    if (typeof str != "string") {
        return retStr;
    }

    if (typeof targetStr != "string" || !targetStr) {
        targetStr = "\\s";
    }

    regStr = "^" + targetStr + "*(.*?)" + targetStr + "*$";
    regStr = new RegExp(regStr);

    str = str.replace(regStr, "$1");
    return str;
}

/**
 * 转换相同连续字符为单一字符(一般为转换空白时使用)
 * @param {String} str
 * @param {String=} targetStr
 * @returns {*}
 */
function itrim(str, targetStr) {
    var retStr = "";
    var replaced = targetStr;
    var regStr;

    if (typeof str != "string") {
        return retStr;
    }

    if (typeof targetStr != "string" || !targetStr) {
        targetStr = "\\s";
        replaced = " ";
    }

    regStr = new RegExp(targetStr + "+", "g");

    str = str.replace(regStr, replaced);
    return str;
}

/**
 * 字符串首字母大写
 * @param str
 * @returns {string}
 * @constructor
 */
function UcFirst(str) {
    var firstChar = "";
    var leftChars = "";
    var retStr;

    if (typeof str == "string" && str.length > 0) {
        firstChar = str[0].toUpperCase();
        leftChars = str.slice(1, str.length);
    }

    retStr = firstChar + leftChars;
    return retStr;
}

/**
 * 字符串中每个单词首字母大写
 * @param str
 * @returns {*}
 * @constructor
 */
function UcWords(str) {
    if (typeof str != "string") {
        return "";
    }
    var retStr = "";
    var tmpStrList = str.split(" ");

    for (var index in tmpStrList) {
        if (tmpStrList.hasOwnProperty(index)) {
            retStr += UcFirst(tmpStrList[index]) + " ";
        }
    }

    return trim(retStr);
}

function getAuthorization(key, args) {
    var md5 = crypto.createHash('md5');

    var buf = new Buffer(10240);
    var len = buf.write(args["Handshake"] + key, 0);
    var resultBuf = buf.toString('binary', 0, len);
    md5.update(resultBuf);
    var Authorization = md5.digest("hex", "utf8");

    return Authorization;
}

// 生成随机数序列
function seedRandom(seed) {
    return SeedRandom.SeedRandom(seed);
}
function Srand(seed) {
    SeedRandom.Srand(seed);
}
function Rand(seed) {
    return SeedRandom.Rand();
}

// sha1算法
function SHA1(str) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    // 返回 sha1 后字符串
    return sha1.digest('hex');
}

// md5算法
function MD5(str) {
    var md5 = crypto.createHash('md5');
    md5.update(str);
    // 返回 sha1 后字符串
    return md5.digest('hex');
}

// 调试标记
function debugLoggerStart(logger, str) {
    console.log();
    console.log();
    logger.debug("======================= [%s Start] =======================", str);
}
function debugLoggerEnd(logger, str) {
    logger.debug("======================= [%s End] =======================", str);
    console.log();
    console.log();
}
function errorLoggerStart(logger, str) {
    console.log();
    console.log();
    logger.debug("======================= [%s Start] =======================", str);
}
function errorLoggerEnd(logger, str) {
    logger.debug("======================= [%s End] =======================", str);
    console.log();
    console.log();
}

// 调试打印
function echo() {
    var len = arguments.length;
    var str, i;

    // 直接输出
    str = "console.log(";
    for (i = 0; i < len; i++) {
        if (i != len - 1) {
            str += util.format("arguments[%d], ", i);
        } else {
            str += util.format("arguments[%d]);", i);
        }
    }
    eval(str);

    // 转换成字符串返回
    str = "util.format(";
    for (i = 0; i < len; i++) {
        if (i != len - 1) {
            str += util.format("arguments[%d], ", i);
        } else {
            str += util.format("arguments[%d]);", i);
        }
    }
    return eval(str) + "\n";
}

/**
 * JSON 字符串格式化
 * @type {{n: string, t: string, convertToString: convertToString, __writeObj: __writeObj, __isArray: __isArray, __repeatStr: __repeatStr}}
 *
 * Usage:
 * JsonUti.convertToString({"name":"json"});
 */
var JsonUti = {
    //定义换行符
    n: "\n",
    //定义制表符
    t: "\t",
    //转换String
    convertToString: function (obj) {
        return JsonUti.__writeObj(obj, 1);
    },
    //写对象
    __writeObj: function (obj    //对象
        , level             //层次（基数为1）
        , isInArray) {       //此对象是否在一个集合内
        //如果为空，直接输出null
        if (obj == null) {
            return JSON.stringify("null");
        }
        //为普通类型，直接输出值
        if (obj.constructor == Number || obj.constructor == Date || obj.constructor == String || obj.constructor == Boolean) {
            var v = obj.toString();
            var tab = isInArray ? JsonUti.__repeatStr(JsonUti.t, level - 1) : "";
            if (obj.constructor == String || obj.constructor == Date) {
                //时间格式化只是单纯输出字符串，而不是Date对象
                return tab + ("\"" + v + "\"");
            }
            else if (obj.constructor == Boolean) {
                return tab + v.toLowerCase();
            }
            else {
                return tab + (v);
            }
        }

        //写Json对象，缓存字符串
        var currentObjStrings = [];
        //遍历属性
        for (var name in obj) {
            var temp = [];
            //格式化Tab
            var paddingTab = JsonUti.__repeatStr(JsonUti.t, level);
            temp.push(paddingTab);
            //写出属性名
            temp.push(name + " : ");

            var val = obj[name];
            if (val == null) {
                temp.push("null");
            }
            else {
                var c = val.constructor;

                if (c == Array) { //如果为集合，循环内部对象
                    temp.push(JsonUti.n + paddingTab + "[" + JsonUti.n);
                    var levelUp = level + 2;    //层级+2

                    var tempArrValue = [];      //集合元素相关字符串缓存片段
                    for (var i = 0; i < val.length; i++) {
                        //递归写对象
                        tempArrValue.push(JsonUti.__writeObj(val[i], levelUp, true));
                    }

                    temp.push(tempArrValue.join("," + JsonUti.n));
                    temp.push(JsonUti.n + paddingTab + "]");
                }
                else if (c == Function) {
                    temp.push("[Function]");
                }
                else {
                    //递归写对象
                    temp.push(JsonUti.__writeObj(val, level + 1));
                }
            }
            //加入当前对象“属性”字符串
            currentObjStrings.push(temp.join(""));
        }
        return (level > 1 && !isInArray ? JsonUti.n : "")                       //如果Json对象是内部，就要换行格式化
            + JsonUti.__repeatStr(JsonUti.t, level - 1) + "{" + JsonUti.n     //加层次Tab格式化
            + currentObjStrings.join("," + JsonUti.n)                       //串联所有属性值
            + JsonUti.n + JsonUti.__repeatStr(JsonUti.t, level - 1) + "}";   //封闭对象
    },
    __isArray: function (obj) {
        if (obj) {
            return obj.constructor == Array;
        }
        return false;
    },
    __repeatStr: function (str, times) {
        var newStr = [];
        if (times > 0) {
            for (var i = 0; i < times; i++) {
                newStr.push(str);
            }
        }
        return newStr.join("");
    }
};

module.exports = {
    "getAuthorization": getAuthorization,

    "readConfig": readConfig,
    "loadFile": loadFile,

    "ltrim": ltrim,
    "rtrim": rtrim,
    "trim": trim,
    "itrim": itrim,

    "UcFirst": UcFirst,
    "UcWords": UcWords,

    "debugLoggerStart": debugLoggerStart,
    "debugLoggerEnd": debugLoggerEnd,
    "errorLoggerStart": errorLoggerStart,
    "errorLoggerEnd": errorLoggerEnd,

    "seedRandom": seedRandom,
    "Srand": Srand,
    "Rand": Rand,

    "SHA1": SHA1,
    "MD5": MD5,

    "echo": echo
};
