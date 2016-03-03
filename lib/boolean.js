/**
 * 判断合法性方法集合
 */

/**
 * 检测用户名是否合法
 * @param username
 * @returns {boolean} 合法返回true, 不合法返回false
 */
function validUsername(username)
{
    /**
     * \w 0-9a-zA-Z_
     * \d 0-9
     * \s not space
     * @type {RegExp}
     */
    var regx=/^[a-zA-Z0-9]{6,20}$/;
    return regx.test(username);
}

/**
 * 检测邮箱是否合法
 * @param email
 * @returns {boolean}
 */
function validEmail(email){
    var regx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return regx.test(email);
}

/**
 * 判断用户是否注册
 * @param userInfo 用户信息/undefined
 * @returns {boolean} 用户存在返回true, 用户不存在返回false
 */
function isRegist(userInfo)
{
    return !!userInfo;
}

/**
 * 验证密码是否是[6,20]位, 两次输入是否相同
 * @param {String} pwd
 * @param {String} pwd_verify
 * @returns {boolean} 合法返回true, 不合法返回false
 */
function validPassword(pwd, pwd_verify){
    if(pwd.length < 6 || pwd.length > 20){
        return false;
    }
    return !!(pwd == pwd_verify);
}

/**
 * 输入密码是否与记录密码一致
 * @param userInfo
 * @param sha1_pwd
 * @returns {boolean}
 */
function matchPassword(userInfo,sha1_pwd)
{
    return !!(userInfo.pwd == sha1_pwd);
}

module.exports = {
    "validUsername": validUsername,
    "validEmail": validEmail,
    "isRegist": isRegist,
    "validPassword": validPassword,
    "matchPassword": matchPassword
};