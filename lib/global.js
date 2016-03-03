/**
 * FileName: GlobalFunction
 * Created by "Justin Chou <zhou78620051@126.com>".
 * On Date: 8/6/2014.
 * At Time: 8:05 PM
 */

var path = require('path');
var UString = require("./string");

const logOpen = false;

function GlobalFunction(base) {
    // 定义全局 静态常量
    global.G = {};
    // 全局总目录
    Object.defineProperty(G, 'BaseDir', {
        value: path.normalize(base + "/../"),
        writable: false
    });
    // 当前项目目录
    Object.defineProperty(G, 'RootDir', {
        value: path.normalize(base + "/"),
        writable: false
    });

    // 文件夹常量
    Object.defineProperty(G, 'ConfigDir', {
        value: path.normalize(G.RootDir + "/cfg/"),
        writable: false
    });
    Object.defineProperty(G, 'ClassDir', {
        value: path.normalize(G.RootDir + "/classes/"),
        writable: false
    });
    Object.defineProperty(G, 'CommonDir', {
        value: path.normalize(G.RootDir + "/common/"),
        writable: false
    });
    Object.defineProperty(G, 'HandleDir', {
        value: path.normalize(G.RootDir + "/handle/"),
        writable: false
    });
    Object.defineProperty(G, 'ModelDir', {
        value: path.normalize(G.RootDir + "/model/"),
        writable: false
    });
    Object.defineProperty(G, 'UtilDir', {
        value: path.normalize(G.RootDir + "/utils/"),
        writable: false
    });

    // 数据加载方法常量

    function _DebugPath (path) {
        if (logOpen) {
            console.info("Load File Path: [ %s ]", path);
        }
    }

    // 加载model dao

    function Dao(filename) {
        var file = G.ModelDir + filename;
        _DebugPath (file);
        return UString.loadFile(file);
    }

    // 加载common static文件
    function LoadStatic(filename) {
        var file = G.CommonDir + filename;
        _DebugPath (file)
        return UString.loadFile(file);
    }

    // 加载cfg 配置文件
    function LoadConfig(filename) {
        var file = G.ConfigDir + filename;
        _DebugPath (file);
        return UString.loadFile(file);
    }

    // 加载cfg 配置文件
    function LoadClass(filename) {
        var file = G.ClassDir + filename;
        _DebugPath (file);
        return UString.loadFile(file);
    }

    // 加载Util 工具
    function LoadUtils(filename) {
        var file = G.UtilDir + filename;
        _DebugPath (file);
        return UString.loadFile(file);
    }

    Object.defineProperty(G, "D", {
        value: Dao,
        writable: false
    });
    Object.defineProperty(G, "S", {
        value: LoadStatic,
        writable: false
    });
    Object.defineProperty(G, "Cfg", {
        value: LoadConfig,
        writable: false
    });
    Object.defineProperty(G, "Class", {
        value: LoadClass,
        writable: false
    });
    Object.defineProperty(G, "U", {
        value: LoadUtils,
        writable: false
    });
}
module.exports = GlobalFunction;

/**
 * Usage:
 *
 * in each entrance, we should call the global function
 * new require("lvge-utils").UGlobal(__dirname);
 *
 * after import the core module, we can use the following
 *
 */
