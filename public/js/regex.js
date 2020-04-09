/**
 *  tc: testcase
 *  {
 *      eng,
 *      num,
 *      email
 *  }
 */
const regex = {
    eng: /^[a-zA-Z]+$/,
    num: /^[0-9]+$/,
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
};
module.exports = tc => regex[tc];
