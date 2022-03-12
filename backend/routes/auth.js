var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
var { signout, signup, signin, isSignedin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "Name cannot be empty").not().isEmpty(),
    check("email", "Email cannot be empty").not().isEmpty(),
    check("password", "password cannot be empty").not().isEmpty(),
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "Email not valid").isEmail(),
    check("password", "password length must be atleast 3 char").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
    check("email", "email is not valid").isEmail(),
    check("password", "password is required").isLength({ min: 3 }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedin, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
