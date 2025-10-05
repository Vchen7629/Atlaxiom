const allowedHosts = require("../config/allowedOrigins");

const checkHost = (req, res, next) => {
    console.log("🔍 Host check - Method:", req.method);
    console.log("🔍 Host check - req.headers.host:", req.headers.host);
    console.log("🔍 Host check - Allowed hosts:", allowedHosts);

    if (req.method === 'OPTIONS') {
        console.log("✅ OPTIONS request, skipping");
        return next();
    }

    const host = req.headers.host;

    if (!allowedHosts.includes(host)) {
        console.log(`❌ BLOCKED: Host '${host}' not in allowed hosts`);
        return res.status(403).json({ message: "Forbidden: invalid Hostname" });
    }

    console.log("✅ Host check passed");
    next();
}

module.exports = checkHost;