const Cart = require("../models/CartModel");

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    // Try to populate both Product and Car
    const cart = await Cart.findOne({ user: userId })
      .populate({ path: "products.product", model: "Product", strictPopulate: false })
      .populate({ path: "products.car", model: "Car", strictPopulate: false });

    if (!cart || !cart.products) {
      return res.status(200).json({ products: [] });
    }

    // Map products array to include either product or car
    const products = cart.products
      .filter((item) => (item.product && item.product._id) || (item.car && item.car._id))
      .map((item) => ({
        ...item.toObject(),
        product: item.product || null,
        car: item.car || null,
      }));

    res.status(200).json({ ...cart.toObject(), products });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
};

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart." });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Cart Item Quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;

    await cart.save();
    res.status(200).json({ message: "Cart updated" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove Item from Cart
exports.removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Sync Guest Cart to Server
exports.syncCart = async (req, res) => {
  try {
    const { items } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    cart.items = items.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    await cart.save();
    res.status(200).json({ message: "Cart synchronized" });
  } catch (error) {
    console.error("Cart sync error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
