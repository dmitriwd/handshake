const express = require("express");
const isCompany = require("../middlewares/isCompany");
const isFreelancer = require("../middlewares/isFreelancer");
const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const router = express.Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.model");
// const Project = require("../models/Project.model");

//route to apply freelancer post page with apply
router.get("/apply/:_id", isFreelancer, (req, res) => {
  const { _id } = req.params;
  Project.findById(_id).then((foundP) => {
    console.log(foundP);
    res.render("apply", { project: foundP });
  });
});

// apply route
router.post("/apply/:_id", isFreelancer, (req, res) => {
  //update Project applications property with user ID
  const { _id } = req.params;
  const freeId = req.session.freelancer._id;
  Project.findByIdAndUpdate(_id, { $push: { applications: freeId } }).then(
    () => {
      res.redirect("/freelancerLanding");
    }
  );
});

//route to change profile
router.get("/profile", isFreelancer, (req, res) => {
  const freelancer = req.session.freelancer;
  res.render("freelancer-profile", { freelancer });
});

module.exports = router;
