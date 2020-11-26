const express = require("express");
const isCompany = require("../middlewares/isCompany");
const isFreelancer = require("../middlewares/isFreelancer");
const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const router = express.Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.model");
const Freelancer = require("../models/Freelancer.model");

//route to apply freelancer post page with apply
router.get("/apply/:_id", isFreelancer, (req, res) => {
  const { _id } = req.params;
  Project.findById(_id).then((foundP) => {
    //console.log(foundP);
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
// route to get the profile page:
router.get("/profile", (req, res) => {
  const freelancer = req.session.freelancer;
  res.render("freelancer-profile", { freelancer });
});

//route to change profile
router.get("/profile/update", isFreelancer, (req, res) => {
  const freelancer = req.session.freelancer;
  res.render("freelancer-profile-Update", { freelancer });
});

//route to change profile
// request to /freelancer/update/:_id
router.post("/profile/update/:_id", isFreelancer, (req, res) => {
  const { _id } = req.params;
  const sanitize = {};
  for (let propierty in req.body) {
    if (req.body[propierty]) {
      sanitize[propierty] = req.body[propierty];
    }
  }

  Freelancer.findByIdAndUpdate(_id, sanitize, { new: true }).then(
    (updatedUser) => {
      req.session.freelancer = updatedUser;
      res.redirect("/freelancer/profile");
    }
  );
});

//added now by gosia route for company to freelancer profile
router.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  //console.log(id.applications);
  // _id equals to project Object, it shows all project properties freelancer id is in applications propertu. applications is an array of objects (applicants). in each of objects applicants ID is a second property named _id
  const freelancer = id.username;
  //req.session.freelancer._id.;
  // const freelancerID = _id.applications.includes(_id);
  Freelancer.findOne(freelancer).then((foundF) => {
    res.render("freelancer-profile", { foundF });
  });
});

//{ foundF });
// });

// Project.find().then((foundProjects) => {
//   const myApliedProjects = foundProjects.filter((el) => {
//     return el.applications.includes(freelancer._id);
//   });
//   console.log(foundProjects);
//   res.render("freelancerLanding", {
//     freelancer,
//     foundProjects,
//     myApliedProjects,
//   });
// });

module.exports = router;
