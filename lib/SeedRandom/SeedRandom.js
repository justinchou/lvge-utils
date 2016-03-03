/**
 * 根据种子生成随机数
 *
 * @param {Number | Optional} seed
 */

var INTMAX = 2147483647;

function SeedRandom(seed){
    if(!seed){
        seed = parseInt(new Date().valueOf() / 1000);
    }
    return Random(INTMAX, 0);
}

/**
 * 生成随机数
 *
 * @return {Number}
 */
function Random(Max, Min){
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

module.exports = {
    "SeedRandom": SeedRandom
};