const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");
const testsRouter = require("./tests/tests-router.js");
const biomarkersRouter = require("./biomarkers/biomarkers-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/tests", testsRouter);
server.use("/api/biomarkers", biomarkersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" })
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
});

module.exports = server;