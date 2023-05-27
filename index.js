// Permet l'accès aux variables d'environnement
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

mongoose.connect(process.env.MONGODB_URI);

// Connexion à l'espace de stockage cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
const paymentRoutes = require("./routes/payment");
app.use(userRoutes);
app.use(offerRoutes);
app.use(paymentRoutes);

app.get("/", (req, res) => {
  res.json("Bienvenue sur l'API de Vinted");
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.all("*", (req, res) => {
  try {
    return res.status(404).json("Page not found!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Server started 🔥");
});
server.timeout = Number(process.env.SERVER_TIMEOUT) || 1000000;
