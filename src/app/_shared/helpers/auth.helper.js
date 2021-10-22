const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const createError = require('./error-handler.helper');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hashedPassword) {
  const foundPassword = await bcrypt.compare(password, hashedPassword);

  return foundPassword;
}

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 30000 });
}

function getAuthToken(authHeader) {
  if (!authHeader) {
    throw createError(401, 'Não autorizado');
  }

  const token = authHeader.split('Bearer ')[1] || null;

  if (!token) {
    throw createError(401, 'Não autorizado');
  }

  return token;
}

function verifyToken(reqToken) {
  try {
    jwt.verify(reqToken, process.env.JWT_SECRET);
  } catch (jwtError) {
    throw createError(401, 'Não autorizado');
  }
}

function validateSessionTime(lastLogin, minutes) {
  const startDate = moment().subtract(minutes, 'm').toISOString();
  const endDate = moment().toISOString();
  return moment(lastLogin).isBetween(startDate, endDate);
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  getAuthToken,
  verifyToken,
  validateSessionTime,
};
