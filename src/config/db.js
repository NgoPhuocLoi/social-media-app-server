const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
