const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const SECRET_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = parseInt(process.env.IV_LENGTH, 10);

const key = Buffer.from(SECRET_KEY.padEnd(32, '0').slice(0, 32), 'utf-8');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
};

const decrypt = (encryptedText) => {

  // console.log("encryptedText",encryptedText)

  if (!encryptedText || typeof encryptedText !== 'string') {
    throw new TypeError('Invalid encryptedText provided. Expected a non-empty string.');
  }

  const textParts = encryptedText.split(':');  // Split the input into IV and encrypted text
  if (textParts.length !== 2) {
    throw new Error('Encrypted text is not in the correct format. Expected "iv:encryptedText".');
  }

  const iv = Buffer.from(textParts[0], 'hex');  // Convert IV from hex to buffer
  const encryptedTextBytes = Buffer.from(textParts[1], 'hex');  // Convert encrypted text to buffer
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);  // Use the formatted key for AES decryption

  // let decrypted = decipher.update(encryptedTextBytes);  // Decrypt the text
  // decrypted = Buffer.concat([decrypted, decipher.final()]);  // Finalize decryption
  // return decrypted.toString();

  try {
    let decrypted = decipher.update(encryptedTextBytes);  // Decrypt the text
    decrypted = Buffer.concat([decrypted, decipher.final()]);  // Finalize decryption
    return { data: decrypted.toString() };
  } catch (e) {
    return { error: 'Decryption failed. Ensure the encrypted data is valid or check your key/IV.' };
  }
};

module.exports = { encryptPassword, comparePassword, encrypt, decrypt };
