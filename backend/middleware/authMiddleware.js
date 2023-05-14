import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//have two routes, protected and admin

//protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read the jwt from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      //verify the token
      //an object that contains the user id field
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//admin middleware
const admin = (req, res, next) => {
  //check if user is admin
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
