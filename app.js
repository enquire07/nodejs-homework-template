import express from "express";
import logger from "morgan";
import cors from "cors";

import { router as contactsRouter } from "./routes/api/contactsRouter.js";
import { router as usersRouter } from "./routes/api/usersRouter.js";

// initialize an express application
const app = express();

// we will retrieve the environment variable using CROSS-ENV that is preinstalled with this boilerplate
// we are creating an instance of a logger function
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// we will apply the use function to implement a middleware
// pass the formatsLogger function to the MORGAN package using the logger function
// middleware is logger function coming from MORGAN
// we are passing formatsLogger as the value of our logger function
app.use(logger(formatsLogger));
app.use(cors());
// this is the JSON parser middleware
app.use(express.json());

// initialize the base path for the contacts router
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

// error handling using res.status()
// not found
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

// server error
app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

// export the express application
// module.exports = app;
export { app };

// IMPORT MODULES
// IMPORT ENVIRONMENT VARIABLES
// IMPORT AND USE MIDDLEWARES
// INITIALIZE BASE PATH FOR ROUTER
// ADD ERROR HANDLING
// EXPORT MODULE