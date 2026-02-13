const Product = require("../../model/product");

// =============== ADD PRODUCT ===============
exports.addProduct = async (req, res) => {
  try {
    let {
      name,
      genderType,
      category,
      subCategory,
      specialProduct,
      brandName,
      quantity,
      price,
      type,
      value,
      description,
      features,
      productInformation,
      variations,
    } = req.body;

    // ✅ Parse JSON for price, productInformation & variations
    if (price) price = JSON.parse(price);
    if (productInformation) productInformation = JSON.parse(productInformation);
    if (variations) variations = JSON.parse(variations);

    // ✅ Attach single variation image (match by index)
    if (variations && req.files["variationImages"]) {
      variations.forEach((v, i) => {
        if (req.files["variationImages"][i]) {
          v.variationImages = req.files["variationImages"][i].filename; // only filename
        }
      });
    }

    const product = new Product({
      name,
      genderType,
      category,
      subCategory: subCategory ? subCategory.split(",") : [],
      specialProduct,
      brandName,
      quantity,
      price,
      type,
      value,
      description,
      features: features ? features.split(",") : [],
      productInformation,
      mainImage: req.files["mainImage"]
        ? req.files["mainImage"][0].filename
        : null, // only filename
      galleryImages: req.files["galleryImages"]
        ? req.files["galleryImages"].map((f) => f.filename)
        : [], // only filenames
      variations,
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// =============== GET PRODUCT BY NAME ===============
exports.getProductByName = async (req, res) => {
  try {
    const product = await Product.findOne({
      name: req.params.name,
    }).populate("reviews.user", "name email");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// =============== GET ALL PRODUCT ===============
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// =============== UPDATE PRODUCT ===============
exports.updateProduct = async (req, res) => {
  try {
    let updates = { ...req.body };

    // ✅ Parse JSON fields
    if (updates.price) updates.price = JSON.parse(updates.price);
    if (updates.productInformation)
      updates.productInformation = JSON.parse(updates.productInformation);
    if (updates.variations) updates.variations = JSON.parse(updates.variations);

    // ✅ String → Array
    if (updates.features && typeof updates.features === "string") {
      updates.features = updates.features.split(",");
    }
    if (updates.subCategory && typeof updates.subCategory === "string") {
      updates.subCategory = updates.subCategory.split(",");
    }

    // 🔍 Get existing product FIRST
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // ✅ Main image replace only if new one comes
    if (req.files["mainImage"]) {
      updates.mainImage = req.files["mainImage"][0].filename;
    }

    // ✅ GALLERY IMAGES → MERGE (THIS IS THE FIX 🔥)
    if (req.files["galleryImages"]) {
      const oldImages = existingProduct.galleryImages || [];
      const newImages = req.files["galleryImages"].map((f) => f.filename);

      const mergedImages = [...oldImages, ...newImages].slice(0, 10); // max 10

      updates.galleryImages = mergedImages;
    }

    // ✅ Variation images
    if (updates.variations && req.files["variationImages"]) {
      updates.variations.forEach((v, i) => {
        if (req.files["variationImages"][i]) {
          v.variationImages = req.files["variationImages"][i].filename;
        }
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




// =============== DELETE PRODUCT ===============
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// =============== ADD REVIEW ===============
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment, userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const review = {
      user: userId,
      rating,
      comment,
      createdAt: new Date(),
    };

    product.reviews.push(review);
    await product.save();

    const populatedProduct = await Product.findById(productId).populate(
      "reviews.user",
      "name email",
    );
    res.json({ success: true, reviews: populatedProduct.reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
