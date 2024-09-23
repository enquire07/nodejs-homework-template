import jwt from "jsonwebtoken";
import { User } from "../models/usersModel.js";
import "dotenv/config";

const { SECRET_KEY } = process.env;

const authenticateToken = async (req, res, next) => {
  // we are accessing the authorization string from the request.headers similar to how we are accessing request body
  const { authorization = "" } = req.headers;

  // console.log("Authorization header received:", authorization);

  // this retrieves the token string from the bearer token by separating the word Bearer and the random string after it
  const [bearer, token] = authorization.split(" ");
  // bearer = Bearer
  // token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJlMmY0OTVkYzE2YTQ2NTU4ZTUzNiIsImlhdCI6MTcyNjE0ODQyNywiZXhwIjoxNzI2MjMxMjI3fQ.dnIUsctml9szpJfCpCQ6BMAfynhyN_V3vDsxZaL9UQg

  // Check if the bearer token is provided and valid
  if (bearer !== "Bearer" || !token) {
    console.log("Invalid authorization format or missing token");
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    console.log("Verifying token...");
    // Verify the token
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log("Token verified, user ID:", id);

    // Find the user by ID and check if token matches
    const user = await User.findById(id);
    if (!user || user.token !== token || !user.token) {
      console.log("User not found or token mismatch");
      return res.status(401).json({ message: "Not authorized" });
    }

    // Attach the user to the request object and continue
    req.user = user;
    console.log("User authenticated successfully:", user.email);
    next();
  } catch (err) {
    console.log("Error verifying token:", err.message);
    // Handle any token verification errors
    return res.status(401).json({ message: "Not authorized" });
  }
};

//console.log("SECRET_KEY:", SECRET_KEY); // Check if it's undefined


export { authenticateToken };