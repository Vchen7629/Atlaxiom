const allowedHost = "api.atlaxiom.com"

const checkHost = (req, res, next) => {
    const host = req.headers.host;

    if (host !== allowedHost) {
        return res.status(403).json({ message: "Forbidden: invalid Hostname" });
    }

    next();
}

module.exports = checkHost;

