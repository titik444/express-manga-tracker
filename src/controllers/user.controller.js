import { compare } from "bcrypt";
import prisma from "../utils/client.js";

import { loginValidation } from "../validations/user.validation.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const loginUser = async (req, res) => {
  try {
    // Validasi input
    const { email, password } = await loginValidation.parseAsync(req.body);

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    // Verifikasi password
    const isPasswordValid = compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        data: null,
      });
    }

    // Buat token
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Hapus password sebelum dikirim
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return res.status(200).json({
      message: "Login success",
      data: {
        ...userWithoutPassword,
        token,
        refreshToken,
      },
    });
  } catch (err) {
    console.error("Error in loginUser:", err.message);
    return res.status(500).json({
      message: "Login failed",
      data: null,
    });
  }
};
