const bcrypt = require('bcryptjs');
const salt = 10;

const encryptPassword = async (password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  } catch (error) {
    throw new Error(error);
  }
};

const checkPassword = async (password, encryptedPassword) => {
  try {
    const isCorrect = await bcrypt.compare(password, encryptedPassword);
    return isCorrect;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  encryptPassword,
  checkPassword,
};
