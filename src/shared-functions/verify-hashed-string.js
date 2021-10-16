module.exports = function makeVerifyHashedString({ bcrypt }) {
  return function verifyHashedString({ string, hash }) {
    return bcrypt.compareSync(string, hash);
  };
};
