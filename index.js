module.exports = {
    ...require("./src/encryptionService"),
    // ...require("./src/sanitizeRequestBody"),
    sanitizeRequestBody: require("./src/sanitizeRequestBody"),
    encryptMiddleware: require("./src/encryptMiddleware"),
    decryptMiddleware: require("./src/decryptMiddleware"),
};