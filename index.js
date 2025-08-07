const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./configs/connectDatabase");
const { errorLogger, reqLogger } = require("./middlewares/loggers");
const { verifyJWT } = require("./middlewares/verifyJWT");

const PORT = process.env.PORT || 5000;
const app = express();

// routers
const rootRoute = require("./routes/root");
const userRegisterRoute = require("./routes/register");
const userProfileRoute = require("./routes/user");
const noteRoute = require("./routes/note");

app.use(reqLogger);
connectDB();

app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// apis
app.use("/", rootRoute);
app.use("/register", userRegisterRoute);

app.use(verifyJWT);
app.use("/user", userProfileRoute);
app.use("/note", noteRoute);

app.use(errorLogger);
app.use((err, req, res, next) => {
	console.log(err.message);
	res.status(500).json({
		message: err.message || "Something went wrong",
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	});
});

mongoose.connection.once("connected", () => {
	app.listen(PORT, console.log(`Server started on https://localhost:${PORT}`));
});
