const express = require("express");
const isCompany = require("../middlewares/isCompany");
const isFreelancer = require("../middlewares/isFreelancer");
const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const router = express.Router();
const mongoose = require("mongoose");
const Project = require("../models/Project.model");
const Freelancer = require("../models/Freelancer.model");

//route to render job post page to see detail and apply
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
// route to get the profile page:
router.get("/profile", isFreelancer, (req, res) => {
  const freelancer = req.session.freelancer;
  res.render("freelancer-profile", { freelancer });
});

//route to change profile
router.get("/profile/update", isFreelancer, (req, res) => {
  const freelancer = req.session.freelancer;
  res.render("freelancer-profile-Update", { freelancer });
});

// request to /freelancer/update/:_id
// id = :_id
// freelancer {_id:^_id}
//route to change profile
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
  /* 
  {
    username:^"",
    location: "¨barcelona"
  }

  if (req.body["username"]) -> req.body.username
  if (req.body.username) {
    sanitize.username = req.body.username - DOES NOT HAPPEN BECAUSE USERNaME Is EMPTY
  }

  if (req.body["¨location"]) -> req.body.location
  if (req.body.location) {
    sanitizie.location = req.body.location
  }

  sanitize = {location :"barcelona"}
  */
  // Freelancer.findById(id, function (err, foundObject) {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send();
  //   } else {
  //     if (!foundObject) {
  //       res.status(404).send();
  //     } else {
  //       if (req.body.username) {
  //         foundObject.username = req.body.username;
  //       }
  //       if (req.body.location) {
  //         foundObject.location = req.body.location;
  //       }
  //       if (req.body.contact) {
  //         foundObject.contact = req.body.contact;
  //       }
  //       if (req.body.skills) {
  //         foundObject.skills = req.body.skills;
  //       }
  //       if (req.body.description) {
  //         foundObject.description = req.body.description;
  //       }
  //       foundObject.save(function (err, updatedObject) {
  //         if (err) {
  //           console.log(err);
  //           res.status(500).send();
  //         } else {
  //           res.send(updatedObject);
  //         }
  //       });
  //     }
  //   }
  // });
});

module.exports = router;
