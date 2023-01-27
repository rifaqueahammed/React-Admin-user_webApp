const express = require('express');
const dbconnection = require("./Config/Connection");
const cors = require("cors");
const bodyParser = require('body-parser');


const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const adminRouter = require("./Routes/Admin");
const userRouter = require("./Routes/User");

dbconnection();

// routers
app.use("/admin", adminRouter);
app.use("/", userRouter);

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
  });
  