import { verifyToken } from "../utils/auth.js";


const protectedRoute = async (req, res, next) => {
  const valid_token = req.cookies.valid_token;
  if (!valid_token) res.send({ message: "not authorized" }).status(401).end();
  else {
    try {
      let data = await verifyToken(valid_token);
      req.data = data;
      next();
    } catch (e) {
      console.log("error in auth middleware", e);
    }
  }
};
export default protectedRoute;