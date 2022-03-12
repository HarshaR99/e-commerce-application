const express = require("express");
const router = express.Router();

const {
  getCategoryId,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category.js");

const { isAdmin, isAuthenticated, isSignedin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById); // parameter extracter
router.param("categoryId", getCategoryId); // parameter extracter

//actual routes goes  here
router.post(
  "/category/create/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  createCategory
);
// get categories
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update
router.put(
  "/category/:categoryId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//delete
router.delete(
  "/category/:categoryId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
