const express = require("express");
const isCompany = require("../middlewares/isCompany");
const isFreelancer = require("../middlewares/isFreelancer");
const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session);
  res.render("index");
});

// LOGINPAGE
router.get("/login", shouldNotBeLoggedIn, (req, res, next) => {
  res.render("login");
});

router.get("/freelancerLanding", isFreelancer, (req, res, next) => {
  res.render("freelancerLanding");
});

router.get("/companyLanding", isCompany, (req, res, next) => {
  res.render("companyLanding");
});
module.exports = router;
