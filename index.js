module.exports = {
    ...require("./src/encryptionService"),
    encryptMiddleware: require("./src/encryptMiddleware"),
    decryptMiddleware: require("./src/decryptMiddleware"),
};