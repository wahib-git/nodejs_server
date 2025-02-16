import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect("mongodb://localhost:27017/wahibdb", {})
  .then(() => console.log("Connecté à MongoDB !"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

// Définition d'un schéma et d'un modèle

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, unique: true },
});
const User = mongoose.model("User", userSchema);

// Route pour créer un nouvel utilisateur
app.post("/userss", (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Route pour obtenir tous les utilisateurs
app.get("/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(port, () =>
  console.log(`Serveur démarré sur http://localhost:${port}`)
);
