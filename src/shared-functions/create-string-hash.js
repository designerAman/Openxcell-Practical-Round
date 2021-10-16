module.exports = function makeCreateStringHash({ bcrypt }) {
  return async function createStringHash({ string }) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(string, salt);
    return hash;
  };
};
