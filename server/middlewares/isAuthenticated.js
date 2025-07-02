import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode =  jwt.verify(token, process.env.SECRET_KEY); //verify token with the key present
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;

    next();//call next function in router i.e getuserprofile

  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;

       