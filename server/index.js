const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user");
const ProductModel = require("./models/product");
const cloudinary = require("./cloudinaryConfig");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
app.use(express.json({ limit: "10mb" }));  // Allows for larger image payloads
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({ message: "Login successful", userEmail: user.email });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});


// Get product by ID
app.get('/get-product/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await ProductModel.findOne({ id: parseInt(id) });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});


// Add product
app.post('/add-product', async (req, res) => {
  try {
    const { id, name, images, imageAlt, price, color, sizes, type, condition, category, description, owner } = req.body;
    if (!images || images.length === 0) {
      return res.status(400).json({ message: "At least one image is required." });
    }

    // Upload each image and store URLs
    const uploadPromises = images.map((image) =>
      cloudinary.uploader.upload(image, {
        upload_preset: "ml_default",
        folder: "uploads",
        allowed_formats: ["jpg", "jpeg", "png"]
      })
    );

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.secure_url);

    // Process color and sizes fields
    const colorArray = Array.isArray(color) ? color : color.split(',');
    const sizesArray = Array.isArray(sizes) ? sizes : sizes.split(',');

    // Create a new product document
    const newProduct = new ProductModel({
      id,
      name,
      images: imageUrls,
      imageAlt,
      price,
      color: colorArray,
      sizes: sizesArray,
      type,
      condition,
      category,
      description,
      owner,
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// Update product API route
// API endpoint to update a product
app.patch('/update-product/:id', async (req, res) => {
  const { id } = req.params;
  const { images, ...updatedData } = req.body;

  try {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        if (image.startsWith('http')) {
          return image; // Existing Cloudinary URL
        } else {
          // Upload base64 image to Cloudinary
          const uploadResult = await cloudinary.uploader.upload(image, {
            upload_preset: "ml_default",
            folder: "uploads",
            allowed_formats: ["jpg", "jpeg", "png"],
          });
          return uploadResult.secure_url; // Return new Cloudinary URL
        }
      })
    );

    // Update product with new images in DB
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { id: parseInt(id) },
      { ...updatedData, images: imageUrls },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});



app.delete("/delete-product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({ id: parseInt(id) });
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});


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
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
