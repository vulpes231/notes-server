const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const logEvent = async (message, fileName) => {
	const currentDateAndTime = format(new Date(), "MMM dd, yyyy \thh:mm:ss a");
	const logMsg = `${currentDateAndTime}\t${uuid()}\t${message}\r\n`;
	const logPath = path.join(__dirname, "../logs");
	try {
		if (!fs.existsSync(logPath)) {
			await fsPromises.mkdir(logPath);
		}
		const filePath = path.join(logPath, fileName);
		await fsPromises.appendFile(filePath, logMsg);
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { logEvent };
