// import jwt from "jsonwebtoken";
// const authMiddleware = (req, res, next) => {
//   try {
//     console.log("hii")
//     const header = req.headers.authorization;
//     console.log(header)
//   const token = header.split(" ")[1];
//     // const token = header
//     // const token = localStorage.getItem('token');
//     console.log(token)
//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: "no token",
//       });
//     }
//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal server error");
//   }
// };
// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    console.log("Auth middleware invoked");

    const header = req.headers.authorization;
    console.log("Authorization header:", header);

    if (!header) {
      return res.status(400).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    let token;
    if (header.startsWith("Bearer ")) {
      token = header.split(" ")[1];
    } else {
      token = header;
    }

  

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
      });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).send("Internal server error");
  }
};

export default authMiddleware;
