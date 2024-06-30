import { Persons } from "../models/person.models.js";
import jwt from "jsonwebtoken";
// export const createPerson = async (req, res) => {
//   try {
//     const header = req.headers.authorization;
//     let token;
//     if (header.startsWith("Bearer ")) {
//       token = header.split(" ")[1];
//     } else {
//       token = header;
//     }

//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: "No token provided",
//       });
//     }

//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decodedToken;

//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).send({ error: "Email is required" });
//     }

//     const userId = req.user._id;

//     // Check if email already exists
//     const existingPerson = await Persons.findOne({ email, user: userId });
//     if (existingPerson) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }

//     // Create new person if email does not exist
//     const person = new Persons({
//       email: email,
//       user: userId,
//     });

//     await person.save();
//     res.status(201).json({
//       success: true,
//       message: "Email added successfully",
//       person: person,
//     });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

export const getAllPersons = async (req, res) => {
  try {
    const header = req.headers.authorization;
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
    console.log(decodedToken)
    req.user = decodedToken;
    const userId = req.user._id;
    console.log(userId)
 
    const persons = await Persons.find({ user: userId }).populate("user");
    res.status(200).send(persons);
  } catch (error) {
    res.status(500).send(error);
  }
};





export const createPerson = async (req, res) => {
  try {
    const header = req.headers.authorization;
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

    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }

    const userId = req.user._id;

    // Check if email already exists for any user
    const existingPerson = await Persons.findOne({ email });
    if (existingPerson) {
      // Handle case if you want to prevent duplicate emails globally
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create new person
    const person = new Persons({
      email: email,
      user: userId,
    });

    await person.save();
    res.status(201).json({
      success: true,
      message: "Email added successfully",
      person: person,
    });
  }  catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
