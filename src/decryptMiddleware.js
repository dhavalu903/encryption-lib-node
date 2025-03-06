const { decrypt } = require('./encryptionService');

const decryptRequestBody = (req, res, next) => {
  try {

    // decrypting post data

    if (req.method !== 'GET') {
      // For non-GET requests, decrypt data in req.body.data
      if (req.body && req.body.data) {
        // console.log("data",req.body.data)
        const {data,error} = decrypt(req.body.data);
        // console.log(data)
        if (error) {
          return res.status(400).json({
            message: 'Invalid or missing encrypted data',
            error: error,  // Send the error message to the client
          });
        }
        
        req.body = JSON.parse(data); // Replace body with decrypted data
      } else {
        // If no encrypted data in non-GET request, reject
        return res.status(400).json({
          message: 'Encrypted data is required in the request body',
        });
      }
    }
    
    // For GET requests, proceed without decryption
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid or missing encrypted data',
      error: error.message,
    });
  }
};

module.exports = decryptRequestBody;
