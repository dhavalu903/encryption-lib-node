// middleware/encryptResponseMiddleware.js
const { encrypt } = require('encryptionService');  

const encryptResponseBody = (req, res, next) => {
  
  const originalSend = res.send;

  
  res.send = (data) => {
  
    const encryptedData = encrypt(data);
    res.setHeader('Content-Type', 'application/json');
    return originalSend.call(res, JSON.stringify({ data: encryptedData }));
  };
  
  next(); 
};

module.exports = encryptResponseBody;
