const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");  // For password hashing
const UserModel = require("./models/user");
const ProductModel = require("./models/product")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Team_project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("MongoDB connection error:", err);
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, mobile, password, accountType } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,  // Store hashed password
      accountType
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user found with this email" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({ message: "Login successful",userEmail: user.email});
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});


//Add product
app.post('/add-product', async (req, res) => {
  const { id, name, href, images, imageAlt, price, color, sizes, type, condition, category, description, owner } = req.body;
  console.log("Request Body:", req.body)

  try {
    // Check if product with the same ID already exists
    const existingProduct = await ProductModel.findOne({ id });
    if (existingProduct) {
      return res.status(400).json({ error: "Product with this ID already exists" });
    }

    // Create a new product
    const newProduct = new ProductModel({
      id,
      name,
      href,
      images,
      imageAlt,
      price,
      color: color.split(','), // Convert string to array
      sizes: sizes.split(','), // Convert string to array
      type,
      condition,
      category,
      description,
      owner,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});


// Backend: Fetch all products for a specific user
app.post('/get-products', async (req, res) => {
  const { ownerEmail } = req.body; // Assume ownerEmail is passed in the request body

  try {
    const products = await ProductModel.find({ owner: ownerEmail });
    res.status(200).json(products); // Send the list of products as JSON response
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});


// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
