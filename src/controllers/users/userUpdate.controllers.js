// import { User } from "../../models/user.models.js";
// import bcrypt from "bcryptjs";
// import { createToken } from "../../utils/index.js";
// import { passwordStrength } from "../../utils/index.js";
// const updateProfile = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const { name, currentPassword, newPassword } = req.body;

//     const user = await User.findById(userId);
//     console.log(user)
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     if (name) {
//       user.name = name;
//     }
//     if (newPassword) {
//       const isPasswordValid = await bcrypt.compare(
//         currentPassword,
//         user.password
//       );
//       if (!isPasswordValid) {
//         return res.status(401).json({
//           success: false,
//           message: "Invalid current password",
//         });
//       }
//       const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashedNewPassword;
//     }

//     await user.save();
//     const token = createToken({ email: user.email, _id: user._id });
//     res.cookie("token", token, {
//       path: "/",
//       expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
//       httpOnly: true,
//       sameSite: "lax",
//     });
//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       userName: user.name,

//       token: token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// };

// export { updateProfile };

import { User } from "../../models/user.models.js";
import bcrypt from "bcryptjs";
import { createToken } from "../../utils/index.js";

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { name, email, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // console.log(user.email);
    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (newPassword) {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid current password",
        });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
    }

    await user.save();
    const token = createToken({ email: user.email, _id: user._id });
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      userName: user.name,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { updateProfile };
