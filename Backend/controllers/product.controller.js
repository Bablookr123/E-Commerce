import Product from "../models/product.model.js";


// add product :/api/product/add-product
export const addProduct = async (req, res) => {
  try {
    const { name, price, offerPrice, description, category } = req.body;
    // const image = req.files?.map((file) => `/uploads/${file.filename}`);
    const image = req.files?.map((file) => file.filename);
    if (
      !name ||
      !price ||
      !offerPrice ||
      !description ||
      !category ||
      !image ||
      image.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including images are required",
      });
    }
    await Product.create({
      name,
      price,
      offerPrice,
      description,
      category,
      image,
    });
    res
      .status(201)
      .json({ message: "product added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};
// get products :/api/product/get
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ products, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get single product :/api/product/id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true },
    );
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res
      .status(200)
      .json({ product, success: true, message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
