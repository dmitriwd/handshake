const express = require("express");
const isCompany = require("../middlewares/isCompany");
const isFreelancer = require("../middlewares/isFreelancer");
const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const router = express.Router();
const mongoose = require("mongoose");
// const Project = require("../models/Project.model");

//route to apply for project project

//route to change profile
router.get("/profile", isFreelancer, (req, res) => {
  const freelancer = req.session.freelancer;
  res.render("freelancer-profile", { freelancer });
});

module.exports = router;
