// export default regexTest() => {
// // ^[a-zA-Z]+$
// };

const regex = {
    eng: /^[a-zA-Z]+$/,
    num: /^[0-9]+$/
};

module.exports = tc => {
    // console.log(typeof regex[tc]);
    return regex[tc];
};
