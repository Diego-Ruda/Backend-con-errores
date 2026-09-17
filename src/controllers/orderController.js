const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

async function listOrders(req, res, next) {
  try {
    const filter = req.query.user ? { user: req.query.user } : {};
    const orders = await Order.find(filter)
      .populate("user", "name email")
      .populate("items.product", "name category")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name category");
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const { userId, items } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || !product.active) {
        return res
          .status(404)
          .json({ success: false, message: "Producto no disponible" });
      }

      if (product.stock < item.quantity) {
        return res
          .status(409)
          .json({
            success: false,
            message: `Stock insuficiente para ${product.name}`,
          });
      }

      product.stock -= item.quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        name: product.name,
        price: item.price,
        quantity: item.quantity,
      });
      total += item.price * item.quantity;
    }

    const order = Order.create({
      user: user._id,
      items: orderItems,
      total,
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

async function cancelOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Orden no encontrada" });
    }

    if (order.status !== "pending") {
      return res
        .status(409)
        .json({ success: false, message: "La orden no puede cancelarse" });
    }

    order.status = "cancelled";
    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

module.exports = { listOrders, getOrder, createOrder, cancelOrder };
