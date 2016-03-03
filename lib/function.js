/**
 * 回调计数
 *
 * @param {Number} counter
 * @param {Function} cb
 * @returns {Number}
 */
function digitalInvoke(counter, cb) {
    var newcounter = counter - 1;
    if (newcounter <= 0) {
        if (!!cb && typeof cb == "function") {
            cb.apply(null, Array.prototype.slice.call(arguments, 2));
        }
    }
    return newcounter;
}

function fireLuck(number) {
    if (typeof number != "number") {
        number = parseFloat(number);
    }

    var luck = false;
    if (number >= 1) {
        luck = true;
        return luck;
    }
    if (number < 0) {
        return luck;
    }

    var random = Math.random();
    if (number >= random) {
        luck = true;
    }
    return luck;
}

module.exports = {
    "digitalInvoke": digitalInvoke,
    "fireLuck": fireLuck
};