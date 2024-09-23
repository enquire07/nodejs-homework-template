import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUsers,
  updateUserSubscription,
} from "../../controllers/usersController.js";
import { authenticateToken } from "../../middlewares/auth.js";

const router = express.Router();

// FOR PUT, PATCH and POST requests always do frontend validation before saving to database

/* POST: // http://localhost:3000/api/users/signup */
router.post("/signup", signupUser);

/* POST: // http://localhost:3000/api/users/login */
router.post("/login", loginUser);

/* GET: // http://localhost:3000/api/users/logout */
router.get("/logout", authenticateToken, logoutUser);

/* GET: // http://localhost:3000/api/users/current */
router.get("/current", authenticateToken, getCurrentUsers);

/* PATCH: // http://localhost:3000/api/users/ */
router.patch("/", authenticateToken, updateUserSubscription);

export { router };