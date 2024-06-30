import { User } from "../../models/user.models.js";
import bcrypt from "bcryptjs";
import { verifyEmail } from "../../utils/index.js";
const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!verifyEmail(email).success) {
      return res.status(400).json({
        success: false,
        message: "invalid email",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "choose a stronger password",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists login",
      });
    }

    const hashedPswd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPswd,
      name,
    });
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
export { registerUser };
