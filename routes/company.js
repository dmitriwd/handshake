const express = require("express");
const isCompany = require("../middlewares/isCompany");
const isFreelancer = require("../middlewares/isFreelancer");
const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const router = express.Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.model");
const { render } = require("../app");

//route to create project
router.get("/project", isCompany, (req, res) => {
  const company = req.session.company;
  res.render("new-project", { company });
});

//route to change profile
router.get("/profile", isCompany, (req, res) => {
  const company = req.session.company;
  res.render("company-profile", { company });
});
//post adding route

router.post("/addPost", isCompany, (req, res) => {
  //console.log(req.body);
  //console.log(req.session.company);
  const {
    when,
    name,
    skillsRequired,
    salary,
    description,
    summary,
    contractType,
  } = req.body;
  const { _id } = req.session.company;
  Project.create({
    when,
    name,
    skillsRequired,
    salary,
    description,
    summary,
    contractType,
    author: _id,
  })
    .then((createdProject) => {
      res.redirect("/companyLanding");
      //if we render here we will only be able to display on rendered page this one created just now project
      //res.render("companyLanding", { createdProject });
    })
    .catch((error) => `Error while creating a new book: ${error}`);
});

//company route to get the profile page:

//route to change profile
router.get("/profile/update", isCompany, (req, res) => {
  const company = req.session.company;
  res.render("company-profile-update", { company });
});

//delete post route
router.post("/deletePost/:_id", isCompany, (req, res) => {
  const { _id } = req.params;
  Project.findByIdAndDelete(_id).then(() => {
    res.redirect("/companyLanding");
  });
});

module.exports = router;
