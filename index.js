const mongoose = require("mongoose");

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose;

app.listen(PORT, () => {});
