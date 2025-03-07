const sanitizeInput = (input) => {
    if (typeof input === 'string') {
      return input.replace(/[<>]/g, ''); // Prevents basic XSS attacks
    }
    return input;
  };
  
 
  
  module.exports = {
    sanitizeInput,
  };
  