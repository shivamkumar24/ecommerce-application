const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const buyerRoutes = require("./routes/buyerRoutes");

const app = express();
require("dotenv").config();

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/buyer", buyerRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
