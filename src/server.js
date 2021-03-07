const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require('./database');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", require('./routes/authRoutes'));
app.use("/adm", require('./routes/admRoutes'));
app.use("/user", require('./routes/userRoutes'));
app.use("/client", require('./routes/clientRoutes'));

app.listen(3001, () => {
  console.log(`Server is running on port 3001.`);
});