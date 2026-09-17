const mongoose = require("mongoose");

async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI no está configurada");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB conectada");
}

module.exports = connectDatabase;
