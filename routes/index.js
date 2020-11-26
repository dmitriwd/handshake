const express = require("express");
const isCompany = require("../middlewares/isCompany");
const isFreelancer = require("../middlewares/isFreelancer");
const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const Project = require("../models/Project.model");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session);
  if (req.session.freelancer) {
    return res.redirect("/freelancerLanding");
  }
  if (req.session.company) {
    return res.redirect("/companyLanding");
  }
  res.render("index");
});

// LOGINPAGE
router.get("/login", shouldNotBeLoggedIn, (req, res, next) => {
  res.render("login");
});

router.get("/freelancerLanding", isFreelancer, (req, res, next) => {
  //we will need to access data of all posts here to pass on freelancingLanding
  const freelancer = req.session.freelancer;
  //try to display post

  Project.find().then((foundProjects) => {
    const myApliedProjects = foundProjects.filter((el) => {
      return el.applications.includes(freelancer._id);
    });
    console.log(foundProjects);
    res.render("freelancerLanding", {
      freelancer,
      foundProjects,
      myApliedProjects,
    });
  });
});
//res.render("freelancerLanding", { freelancer }

router.get("/companyLanding", isCompany, (req, res, next) => {
  const company = req.session.company;
  Project.find({ author: company._id }).then((companyProjects) => {
    res.render("companyLanding", { company, companyProjects });
  });
});

module.exports = router;
