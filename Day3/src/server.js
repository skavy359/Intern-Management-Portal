const express = require("express");
const app = express();
const env = require("./config/env");
const internRoutes = require("./routes/intern.routes");
const requestLogger = require("./middleware/logger");
const errorHandler = require("./middleware/error-handler");

app.use(requestLogger);

app.use(express.json());

app.use("/intern-practice", internRoutes);

app.use(errorHandler);

app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
});