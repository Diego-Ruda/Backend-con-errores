const express = require("express");
const {
  listOrders,
  getOrder,
  createOrder,
  cancelOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/").get(listOrders).post(createOrder);
router.get("/:id", getOrder);
router.patch("/:id/cancel", cancelOrder);

module.exports = router;
