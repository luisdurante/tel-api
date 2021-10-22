const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hashedPassword) {
  const foundPassword = await bcrypt.compare(password, hashedPassword);

  return foundPassword;
}

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 1800 });
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
