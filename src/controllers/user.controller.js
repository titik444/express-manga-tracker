import { compare } from "bcrypt";
import prisma from "../utils/client.js";
import { loginValidation } from "../validations/user.validation.js";
import {
  generateAccessToken,
  generateRefreshToken,
  parseJwt,
  verifyRefreshToken,
} from "../utils/jwt.js";

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password: inputPassword } = await loginValidation.parseAsync(
      req.body
    );

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    const isPasswordValid = await compare(inputPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        data: null,
      });
    }

    // eslint-disable-next-line no-unused-vars
    const { password: _, ...userData } = user;

    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    return res.status(200).json({
      message: "Login successful",
      data: {
        ...userData,
        token: accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Internal server error during login",
      data: null,
    });
  }
};

// GET CURRENT USER
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Current user fetched successfully",
      data: req.user,
    });
  } catch (error) {
    console.error("Get current user error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Missing or invalid authorization header",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyRefreshToken(token);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid refresh token",
        data: null,
      });
    }

    const { id } = await parseJwt(token);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      message: "Access token refreshed",
      data: {
        ...user,
        token: accessToken,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error.message);
    return res.status(500).json({
      message: "Internal server error during token refresh",
      data: null,
    });
  }
};
