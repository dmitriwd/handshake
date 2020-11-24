const express = require("express");
const isCompany = require("../middlewares/isCompany");
const isFreelancer = require("../middlewares/isFreelancer");
const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const router = express.Router();
const mongoose = require("mongoose");
// const Project = require("../models/Project.model");

//route to create project
router.get("/project", isCompany, (req, res) => {
  const company = req.session.company;
  res.render("new-project", { company });
});

//route to change profile
router.get("/profile", isCompany, (req, res) => {
  const company = req.session.company;
  res.render("new-project", { company });
});
//post adding route
//BELOW CODE DOES NOT WORK
// router.post("/:id/addPost", isCompany, (req, res) => {
//   //create new post code
//   // console.log(req.body);
//   const { name, skillsRequired, salary, description, contractType } = req.body;
//   const { id } = req.params;
//   Project.create({
//     body,
//     project: id,
//     author: req.session.comp,
//   })
//     .then((projectFromDB) =>
//       console.log(`New book created: ${projectFromDB.author}.`)
//     )
//     .catch((error) => `Error while creating a new book: ${error}`);
// });
// const company = req.session.company;
// res.render("new-project", { company });

module.exports = router;
