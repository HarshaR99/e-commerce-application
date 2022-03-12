const express = require("express");
const router = express.Router();

const { isAdmin, isSignedin, isAuthenticated } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//create
router.post(
  "/order/create/:userId",
  isSignedin,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder,
  getOrderStatus
);

//read
router.get(
  "/order/all/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

//status of order
router.get(
  "/order/status/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
//update order status
router.put(
  "/order/:orderId/status/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
