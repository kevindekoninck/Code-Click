import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

import { body, validationResult } from "express-validator";

export const validateCreateUser = [
  body("email").isEmail().withMessage("Email invalide"),

  body("password")
    .isLength({ min: 12 })
    .withMessage("Le mot de passe doit contenir au moins 12 caractères"),

  body("firstname").notEmpty().withMessage("Le prénom est obligatoire"),

  body("lastname").notEmpty().withMessage("Le nom est obligatoire"),
];

// GET /users
export const getMyUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        user_powers: true,
        user_inventory: true,
        user_scores: true,
        user_achievements: true,
        user_quizzes: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error("Erreur getUserById:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /users
export const createUser = async (req, res) => {
  const { login, password, email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Vérifier si l'email existe déjà
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      return res.status(400).json({ error: "L'email est déjà utilisé." });
    }

    // Vérifier si le login existe déjà (optionnel mais conseillé)
    const loginExists = await prisma.user.findUnique({
      where: { login },
    });

    if (loginExists) {
      return res.status(400).json({ error: "Le login est déjà utilisé." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du user
    const newUser = await prisma.user.create({
      data: {
        login,
        password: hashedPassword,
        email,
      },
    });

    return res.json(newUser);
  } catch (e) {
    console.error("Prisma Error:", e);
    return res.status(500).json({ error: "Impossible de créer l'utilisateur" });
  }
};
export const login = async (req, res) => {
  const { login: loginInput, password } = req.body;

  try {
    // 1) Vérifier que l'utilisateur existe
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ login: loginInput }, { email: loginInput }],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Login incorrect" });
    }

    // 2) Vérifier le mot de passe
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    // 3) Générer un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES || "1h",
    });
    // Envoi du token dans un cookie
    res.cookie("token", token, {
      httpOnly: true, // invisible côté JS
      secure: true, // HTTPS obligatoire
      sameSite: "none", // pour cross-site requests
      maxAge: 1 * 24 * 60 * 60 * 1000, // 7 jours
    });

    // 4) Retourner le token
    return res.json({
      id: user.id,
      message: "Connexion réussie",
      token,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

/* --- MODIFY --- */
export const modifyUser = async (req, res) => {
  try {
    const allowedFields = ["firstname", "lastname"];

    const data = {};

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        data[key] = req.body[key];
      }
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur modifyUser:", error);
    res.status(500).json({
      error: "Erreur lors de la modification du profil",
    });
  }
};
/* --- DELETE --- */
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.users.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Users supprimée avec succès" });
  } catch (error) {
    console.error("Erreur deleteUser:", error);
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};

export default {
  getUserById,
  createUser,
  getUsers,
  deleteUser,
  modifyUser,
  getMyUser,
  validateCreateUser,
};
