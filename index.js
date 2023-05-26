const express = require("express");
const urlencoded = express.urlencoded;
const cookieParser = require("cookie-parser");
const process = require("process");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var cors = require('cors')
const bodyParser = require("body-parser");
const routerService = require("./app/router/router");
const { errHandle } = require("./app/middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./app/swagger/swagger.json");
const exp = require("constants");
const app = express();

//swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Load environment variable
require("dotenv").config({ path: path.join(process.cwd(), `.env`) });
const args = process.argv.slice(2)[0];
process.env.CONFIG_ARG = args;
let CONFIG = require('./app/configs/config')(args)
process.env = { ...process.env,...CONFIG}
console.log('process.env',process.env)


app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.static(__dirname + "/assets"));

var numOfRequest = 1;
app.use((req, res, next) => {
  req.startTime = Date.now();
  req.numOfRequest = numOfRequest;
  numOfRequest++;
  console.log("Hit : " + req.originalUrl);
  next();
});

//DB connection
const connectOptions = {
  useNewUrlParser: true,
  autoIndex: true,
};
mongoose.connect(process.env.MONGO_URI, connectOptions, (e) =>
  e ? console.log(e) : console.log("DB connected successfully..")
);

const port = process.env.PORT;
app.use("/communication", routerService);

app.listen(port, () => {
  console.log(
    `Microservice ${process.env.SERVICE_NAME} is running on port ${port}.`
  );
});

app.get("/", (req, res) => {
  res.send("successfully connnected");
});

app.use(errHandle);
