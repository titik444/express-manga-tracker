import prisma from "../utils/client.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized", data: null });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token); // Jika expired, error dilempar ke catch

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found", data: null });
    }

    req.user = user;
    next();
  } catch (err) {
    const isExpired = err.name === "TokenExpiredError";
    const message = isExpired ? "Access token expired" : "Invalid token";

    console.error("Authentication error:", err.message);
    return res.status(401).json({ message, data: null });
  }
};
