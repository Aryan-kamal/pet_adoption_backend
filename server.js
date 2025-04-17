const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const petRoutes = require("./routes/petRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRouter");

const app = express();
connectDB();
const allowedOrigins = [
	"https://pet-adoption-frontend-two.vercel.app",
	"http://localhost:3000",
];
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);

app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", petRoutes);
app.use("/api/products", productRoutes);
app.use("/api", orderRouter);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
