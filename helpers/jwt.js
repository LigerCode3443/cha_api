import jwt from "jsonwebtoken";

// const { JWT_SECRET } = process.env;

export const createToken = (payload) =>
  jwt.sign(payload, "sgmZb77o6ZKBlEzqpz7k2WezUzxPpqiT", { expiresIn: "24h" });

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, "sgmZb77o6ZKBlEzqpz7k2WezUzxPpqiT");
    return { data: payload };
  } catch (error) {
    return { error };
  }
};
