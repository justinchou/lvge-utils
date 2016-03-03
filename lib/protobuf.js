var logger = require('pomelo-logger').getLogger(__filename, "Module LvGeUtils");
//var logger = console;
var fs = require("fs");
var util = require("util");
var ProtoBuf = require("protobufjs");

var debug = false;

function configure(config) {
    if (!config || typeof config != "object") {
        config = {
            "debug": false
        };
    }
    debug = !!config.debug;
}

/**
 * 从请求中的数据中按照protobuf格式获取指定参数 - 服务器端用
 *
 * @param {String | Object} args
 * @param {Object | String} proto
 * @param {String} ObjName
 * @returns {Object} {!ProtoBuf.Builder.Message}
 */
function getParams(args, proto, ObjName) {

    if (null == proto) {
        logger.error('No proto File Configured！');
        return {};
    } else if (typeof proto == "string") {
        if (fs.existsSync(proto)) {
            proto = ProtoBuf.loadProtoFile(proto);
        } else if (fs.existsSync(proto + ".proto")) {
            proto = ProtoBuf.loadProtoFile(proto + ".proto");
        } else {
            return {};
        }
    }

    var Obj = proto.build(ObjName);
    var msg = Obj.decode64(args);
    debug && logger.trace("Load Data From Client [ %s ]", JSON.stringify(msg));
    return msg;
}

/**
 * 将需要返回的数据按照指定protobuf格式打包 - 服务器端用
 *
 * @param {Object | String} args
 * @param {Object | String} proto
 * @param {String} ObjName
 * @returns {String} {*}
 */
function packResult(args, proto, ObjName) {
    debug && logger.trace("Package Data To Client [ %s ]", JSON.stringify(args));
    if (null == proto) {
        logger.error('No proto File Configured！');
        return "";
    } else if (typeof proto == "string") {
        if (fs.existsSync(proto)) {
            proto = ProtoBuf.loadProtoFile(proto);
        } else if (fs.existsSync(proto + ".proto")) {
            proto = ProtoBuf.loadProtoFile(proto + ".proto");
        } else {
            return "";
        }
    }

    var RetMessage = proto.build("Ret" + ObjName);
    try {
        var ret_msg = new RetMessage();
    } catch (e) {
        console.log(RetMessage, e);
    }

    for (var index in args) {
        if (args.hasOwnProperty(index)) {
            ret_msg[index] = args[index];
        }
    }

    return ret_msg.toBase64();
}

/**
 * 将指定对象按照protobuf格式打包成 - 测试客户端用
 *
 * @param {Object | String} args
 * @param {Object | String} proto
 * @param {String} ObjName
 * @returns {String} {*}
 */
function packParams(args, proto, ObjName) {
    debug && logger.trace("Send Request Packet Data [ %s ]", JSON.stringify(args));
    if (null == proto) {
        logger.error('No proto File Configured！');
        return "";
    } else if (typeof proto == "string") {
        if (fs.existsSync(proto)) {
            proto = ProtoBuf.loadProtoFile(proto);
        } else if (fs.existsSync(proto + ".proto")) {
            proto = ProtoBuf.loadProtoFile(proto + ".proto");
        } else {
            return "";
        }
    }

    var RetMessage = proto.build(ObjName);
    try {
        var ret_msg = new RetMessage();
    } catch (e) {
        console.log(RetMessage, e);
        throw e;
    }

    for (var index in args) {
        if (args.hasOwnProperty(index)) {
            ret_msg[index] = args[index];
        }
    }

    return ret_msg.toBase64();
}

/**
 * 从protobuf数据中获取某属性对应对象的值
 *
 * @param {String | Object} args
 * @param {Object | String} proto
 * @param {String} ObjName
 * @returns {Object} {!ProtoBuf.Builder.Message}
 */
function getObject(args, proto, ObjName) {
    return getParams(args, proto, ObjName);
}

/**
 * 将某属性对应的对象打包成protobuf数据
 *
 * @param {Object | String} args
 * @param {Object | String} proto
 * @param {String} ObjName
 * @returns {String} {*}
 */
function packObject(args, proto, ObjName) {
    return packParams(args, proto, ObjName);
}

/**
 * 从获取的数据中根据protobuf格式解包 - 测试客户端用
 *
 * @param {String | Object} args
 * @param {Object | String} proto
 * @param {String} ObjName
 * @returns {Object} {*}
 */
function getResult(args, proto, ObjName) {
    if (null == proto) {
        logger.error('No proto File Configured！');
        return {};
    } else if (typeof proto == "string") {
        if (fs.existsSync(proto)) {
            proto = ProtoBuf.loadProtoFile(proto);
        } else if (fs.existsSync(proto + ".proto")) {
            proto = ProtoBuf.loadProtoFile(proto + ".proto");
        } else {
            return {};
        }
    }

    var Obj = proto.build("Ret" + ObjName);
    var msg = Obj.decode64(args);
    debug && logger.trace("Load Request Packet Data [ %s ]", JSON.stringify(msg));
    return msg;
}

/**
 * 根据对象名生成对象框架
 *
 * @param proto
 * @param ObjName
 * @returns {*}
 */
function createObject(proto, ObjName) {
    if (typeof proto != "object" || typeof ObjName != "string") {
        logger.error("proto is not object OR ObjName is not string");
        return {};
    }

    var Class = proto.build(ObjName);
    var obj = new Class();

    for (var index in obj) {
        if (obj.hasOwnProperty(index) && !obj[index]) {
            obj[index] = {};
        }
    }

    return obj;
}

function LoadProtoObjectKeyList(str) {
    var structureKeyList = [];

    var filePath = global.G.ROOT_DIR + "/common/ProtoBuf/DataStructure/" + str + ".proto";
    if (!fs.existsSync(filePath)) {
        logger.error("load return object structure fails! path: [ %s ]", filePath);
        debug && logger.trace("load return object structure fails! path: [ %s ]", filePath);
        return structureKeyList;
    }

    var protofile = fs.readFileSync(filePath).toString();
    var regStr = "message\\s*" + str + "\\s*[^}]*";
    var regExp = new RegExp(regStr, "mg");
    var objMessage = protofile.match(regExp);
    if (null == objMessage || !util.isArray(objMessage) || objMessage.length <= 0) {
        logger.error("file[ %s ] doesn't contain RegExp[ %j ]", filePath, RegExp);
        debug && logger.trace("file[ %s ] doesn't contain RegExp[ %j ]", filePath, RegExp);
        return structureKeyList;
    }

    var reg = /(optional|repeated)(\s*\S*\s*)(\S*)/mg;
    var tmpList = objMessage[0].match(reg);

    if (!util.isArray(tmpList)) {

    }

    for (var i = tmpList.length - 1; i >= 0; i--) {
        var tmpParams = tmpList[i].split(/\s/);
        for (var j = tmpParams.length - 1; j >= 0; j--) {
            if (tmpParams[j].length <= 0) {
                tmpParams.splice(j, 1);
            }
        }
        if (tmpParams.length < 3) {
            logger.error("return object contains invalid style: [ %s ]", tmpParams, tmpList[i]);
            debug && logger.trace("return object contains invalid style: [ %s ]", tmpParams, tmpList[i]);
            continue;
        }
        var mark = tmpParams[0];
        var type = tmpParams[1];
        var key = tmpParams[2];
        console.log("mark[ %s ] type[ %s ] key[ %s ] tmpParams[ %j ]", mark, type, key, tmpParams);
        structureKeyList.push(key);
    }

    logger.debug("将目标对象简化成ProtoBuf对象[ %j ]", structureKeyList);

    return structureKeyList;
}

module.exports = {
    "configure": configure,
    "getParams": getParams,
    "packParams": packParams,
    "getResult": getResult,
    "packResult": packResult,
    "getObject": getObject,
    "packObject": packObject,
    "createObject": createObject,
    "LoadProtoObjectKeyList": LoadProtoObjectKeyList
};
