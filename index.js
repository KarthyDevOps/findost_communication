const express = require("express");
const urlencoded = express.urlencoded;
const cookieParser = require("cookie-parser");
const process = require("process");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var cors = require("cors");
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
let CONFIG = require("./app/configs/config")(args);
process.env = { ...process.env, ...CONFIG };


console.log("Ars", args);
console.log("configs--->", process.env);


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



let mongoDBOptions;

if (args === "PREPROD") {
  mongoDBOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false,
  };
} else {
  mongoDBOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
}

console.log("MOngo DB options ", mongoDBOptions);
// Connect to database
mongoose
  .connect(process.env.MONGO_URI, mongoDBOptions)
  .then((res) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });
mongoose.connection.on("error", function (err) {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});

//initiative aws s3 buck
const port = process.env.PORT;
app.use("/communication", routerService);

app.listen(port, () => {
  console.log(
    `Microservice ${process.env.SERVICE_NAME} is running on port ${port}.`
  );
});

app.get("/", (req, res) => {
  res.send("successfully connnected - findoc - COMMUNICATIOn");
});

app.use(errHandle);
