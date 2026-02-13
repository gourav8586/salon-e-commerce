const Cart = require("../../model/cart");
const Product = require("../../model/product");

// Always create a new cart entry
// exports.addToCart = async (req, res) => {
//   try {
//     const { userId, productId, variation, quantity } = req.body;

//     // Get product details
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     let selectedPrice;

//     // If variation is provided
//     if (variation) {
//       const v = product.variations.find((v) => v.value === variation);
//       if (!v) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid variation" });
//       }
//       selectedPrice = {
//         regular: v.price.regular,
//         offer: v.price.offer ? v.price.offer : v.price.regular,
//       };
//     } else {
//       // No variation → use main product price
//       selectedPrice = {
//         regular: product.price.regular,
//         offer: product.price.offer
//           ? product.price.offer
//           : product.price.regular,
//       };
//     }

//     // ✅ Always create new cart document
//     const cart = new Cart({
//       user: userId,
//       products: [
//         {
//           product: productId,
//           variation: variation || null,
//           quantity,
//           price: selectedPrice,
//         },
//       ],
//     });

//     await cart.save();
//     res.status(201).json({ success: true, cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// Add to Cart (Fixed - Add to existing cart)
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, variation, quantity } = req.body;

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let selectedPrice;

    // If variation is provided
    if (variation) {
      const v = product.variations.find((v) => v.value === variation);
      if (!v) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid variation" });
      }
      selectedPrice = {
        regular: v.price.regular,
        offer: v.price.offer ? v.price.offer : v.price.regular,
      };
    } else {
      // No variation → use main product price
      selectedPrice = {
        regular: product.price.regular,
        offer: product.price.offer
          ? product.price.offer
          : product.price.regular,
      };
    }

    // ✅ Find existing cart or create new one
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: userId,
        products: [
          {
            product: productId,
            variation: variation || null,
            quantity,
            price: selectedPrice,
          },
        ],
      });
    } else {
      // Check if product already exists in cart
      const existingProductIndex = cart.products.findIndex(
        p => p.product.toString() === productId && p.variation === (variation || null)
      );

      if (existingProductIndex > -1) {
        // Update quantity if product exists
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.products.push({
          product: productId,
          variation: variation || null,
          quantity,
          price: selectedPrice,
        });
      }
    }

    await cart.save();
    res.status(201).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update product quantity in cart
exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId, variation, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Find item in cart
    const itemIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId && p.variation === (variation || null)
    );

    if (itemIndex > -1) {
      // Fetch product again for updated price
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      let selectedPrice;

      if (variation) {
        // Check variation price
        const v = product.variations.find((v) => v.value === variation);
        if (!v) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid variation" });
        }
        selectedPrice = {
          regular: v.price.regular,
          offer: v.price.offer ? v.price.offer : v.price.regular,
        };
      } else {
        // Use base product price
        selectedPrice = {
          regular: product.price.regular,
          offer: product.price.offer ? product.price.offer : product.price.regular,
        };
      }

      // ✅ Update quantity + refresh price
      cart.products[itemIndex].quantity = quantity;
      cart.products[itemIndex].price = selectedPrice;

      await cart.save();
      return res.status(200).json({ success: true, cart });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Product not in cart" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.body;

     if (!cartId) {
      return res
        .status(400)
        .json({ success: false, message: "cartId is required" });
    }

    let cart = await Cart.findByIdAndDelete(cartId);
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    res.status(200).json({ success: true, message: "Cart Removed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all carts for a user
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const carts = await Cart.find({ user: userId })
      .populate("products.product");

    if (!carts || carts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No carts found",
      });
    }

    res.status(200).json({ success: true, carts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
