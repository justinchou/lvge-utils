/**
 * Created by Xiaoyu on 6/5/14.
 */

/**
 * 获取今天午夜24:00, 明日00:00时间戳
 *
 * @returns {number}
 */
function getMidnightTimestamp() {

    // 当前时间对象, 日期加一
    var date = new Date();
    date.setDate(date.getDate()+1);

    // 取日期部分, 忽略时间部分(设置为00:00:00 000)后, 转换为时间戳
    var midnight = Date.parse(date.toDateString());

    return  parseInt(midnight / 1000, 10);
}

function getZeroAmTimestamp() {

    // 当前时间对象, 日期加一
    var date = new Date();
    date.setDate(date.getDate());

    // 取日期部分, 忽略时间部分(设置为00:00:00 000)后, 转换为时间戳
    var midnight = Date.parse(date.toDateString());

    return  parseInt(midnight / 1000, 10);
}


module.exports = {
    "getMidnightTimestamp": getMidnightTimestamp,
    "getZeroAmTimestamp": getZeroAmTimestamp
};