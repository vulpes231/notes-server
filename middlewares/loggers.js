const { logEvent } = require("../utils/logEvent");

const reqLogger = (req, res, next) => {
	const clientIp =
		req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
		req.socket.remoteAddress;

	logEvent(
		`${req.method}\t${req.url}\t${clientIp}\t${req.headers["user-agent"]}`,
		"reqLog.txt"
	);
	next();
};

const errorLogger = (err, req, res, next) => {
	logEvent(`${err.message}\t${err.stack}${err.name}\n`, "err.txt");
	next(err);
};

module.exports = { reqLogger, errorLogger };
