import mongoose from "mongoose";
import { app } from "./app.js";
import dotenv from "dotenv";

// initialize the environment variables
dotenv.config();
// access the environment variables
const { DB_HOST } = process.env; // or process.env.DB_HOST if you dont want to destructure

mongoose
  .connect(DB_HOST, {
   
  })
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running. Use our API on port: 8080");
    });

    console.log("Database connect successful");
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1); // this terminates the mongoose connection
  });

  