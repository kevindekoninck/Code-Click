// src/server.js
import express from "express";
import usersRoutes from "./routes/users.routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ou "*" pour autoriser tous les domaines
    credentials: true, // si tu utilises cookies
  })
);
app.use(express.json()); // ← très important !

// Routes
app.use("/users", usersRoutes);

// Lancement du serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
