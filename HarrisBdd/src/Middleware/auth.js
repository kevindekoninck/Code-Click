import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  // Récupère le token depuis le cookie
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Token manquant" }); // on verifie si le toeken existe
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // on extrait l'id du user via le token
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    return res.status(401).json({ error: "Token invalide" });
  }
};
