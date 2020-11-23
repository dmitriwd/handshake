const express = require("express");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/freelancerLanding", (req, res, next) => {
  res.render("freelancerLanding");
});

router.get("/companyLanding", (req, res, next) => {
  res.render("companyLanding");
});
module.exports = router;
