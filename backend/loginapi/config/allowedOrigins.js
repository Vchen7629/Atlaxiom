const allowedHosts = [
    "atlaxiom.com",
    "www.atlaxiom.com", 
    "localhost:3000",
    "localhost:5173",
    "127.0.0.1:3000",      // ✅ Add this
    "127.0.0.1:5173",
    "api.atlaxiom.com"
];

module.exports = allowedHosts