import jwt from "jsonwebtoken";

const generateToken = async (res, userId, email, password) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //set jwt as httpOnly cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
  });
};

export default generateToken;
