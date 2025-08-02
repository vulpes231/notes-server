const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./configs/connectDatabase");
const { errorLogger, reqLogger } = require("./middlewares/loggers");

const PORT = process.env.PORT || 5000;
const app = express();

// routers
const rootRoute = require("./routes/root");

app.use(reqLogger);
connectDB();

app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// apis
app.use("/", rootRoute);

app.use(errorLogger);
app.use((err, req, res, next) => {
	res.status(500).send("Something broke!");
});

mongoose.connection.once("connected", () => {
	app.listen(PORT, console.log(`Server started on https://localhost:${PORT}`));
});
