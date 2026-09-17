require("dotenv").config();

const mongoose = require("mongoose");
const connectDatabase = require("./src/config/database");
const Product = require("./src/models/Product");
const User = require("./src/models/User");
const Order = require("./src/models/Order");

const products = [
  {
    name: "Auriculares Nova",
    description: "Auriculares inalámbricos con cancelación de ruido.",
    category: "audio",
    price: 89.99,
    stock: 25,
  },
  {
    name: "Teclado Atlas",
    description: "Teclado mecánico compacto para trabajo y gaming.",
    category: "perifericos",
    price: 74.5,
    stock: 18,
  },
  {
    name: "Cámara Lumen",
    description: "Cámara web Full HD con micrófono integrado.",
    category: "video",
    price: 52,
    stock: 12,
  },
];

const users = [
  { name: "Ana Pérez", email: "ana@example.com", password: "secreto123" },
  { name: "Bruno Gómez", email: "bruno@example.com", password: "secreto456" },
];

async function seed() {
  try {
    await connectDatabase();
    await Promise.all([
      Product.deleteMany({}),
      User.deleteMany({}),
      Order.deleteMany({}),
    ]);
    await Product.insertMany(products);
    await User.insertMany(users);
    console.log("Base de datos poblada correctamente");
  } catch (error) {
    console.error("Error ejecutando seed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
