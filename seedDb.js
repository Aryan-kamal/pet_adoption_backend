const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Pet = require("./models/Pet");
const Product = require("./models/Product");
require('dotenv').config();


async function seedDatabase() {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("✅ Connected to MongoDB");

		// Helper to read JSON file
		const readJsonFile = (filename) => {
			const filePath = path.join(__dirname, "..", filename);
			const raw = fs.readFileSync(filePath, "utf-8");
			return JSON.parse(raw);
		};

		// Read data
		const cats = readJsonFile("cat.txt");
		const dogs = readJsonFile("dog.txt");
		const products = readJsonFile("product.txt");
		const pets = [...cats, ...dogs];

		// Optional: clear existing data
		await Pet.deleteMany({});
		await Product.deleteMany({});

		// Insert data
		const petResult = await Pet.insertMany(pets);
		const productResult = await Product.insertMany(products);

		console.log(
			`✅ Seeded ${petResult.length} pets and ${productResult.length} products.`
		);
	} catch (error) {
		console.error("❌ Error seeding database:", error);
	} finally {
		await mongoose.disconnect();
		console.log("🔌 Disconnected from MongoDB");
	}
}

seedDatabase();
