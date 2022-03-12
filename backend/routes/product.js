const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");

const { isAdmin, isSignedin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//parameter extracter
router.param("userId", getUserById);
router.param("productId", getProductById);

//actual routes create route
router.post(
  "/product/create/:userId",
  isAdmin,
  isSignedin,
  isAuthenticated,
  createProduct
);
//read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete(
  "/product/:productId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//update route
router.put(
  "/product/:productId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//listing route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
