const router = require("express").Router();

// ? Package to will handle encryption of password
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Requiring the User model in order to interact with the database
const Company = require("../models/Company.model");
const Freelancer = require("../models/Freelancer.model");

// Requiring necessary middlewares in order to control access to specific routes
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

// get and post routes for company signup
router.get("/company/signup", shouldNotBeLoggedIn, (req, res) => {
  res.render("auth/company/signup");
});

router.post("/company/signup", shouldNotBeLoggedIn, (req, res) => {
  const {
    username,
    password,
    email,
    location,
    businessSector,
    description,
    address,
    contact,
  } = req.body;

  if (!username || !email || !location || !contact) {
    //console.log("HELP?");
    return res.status(400).render("auth/company/signup", {
      errorMessage: "Please provide requiered fields",
    });
  }
  if (password.length < 8) {
    //console.log("PASSORD?");
    return res.status(400).render("auth/company/signup", {
      errorMessage: "Your password needs to be at least 8 characters",
    });
  }
  Company.findOne({ username }).then((found) => {
    if (found) {
      return res.status(400).render("auth/company/signup", {
        errorMessage: "Username already taken",
      });
    }
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return Company.create({
          username,
          password: hashedPassword,
          email,
          location,
          businessSector,
          description,
          address,
          contact,
        });
      })
      .then((company) => {
        // binds the user to the session object
        req.session.company = company;
        res.redirect("/companyLanding");
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("auth/company/signup", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render("auth/company/signup", {
            errorMessage:
              "Username need to be unique. THe username you chose is already in used.",
          });
        }
        return res
          .status(500)
          .render("auth/company/signup", { errorMessage: error.message });
      });
  });
});

// freelancer get and post signup routes

router.get("/freelancer/signup", shouldNotBeLoggedIn, (req, res) => {
  res.render("auth/freelancer/signup");
});

router.post("/freelancer/signup", shouldNotBeLoggedIn, (req, res) => {
  const {
    username,
    password,
    email,
    location,
    description,
    skills,
    contact,
  } = req.body;

  if (!username || !email || !location || !skills || !contact) {
    return res.status(400).render("auth/freelancer/signup", {
      errorMessage: "Please provide requiered fields",
    });
  }
  if (password.length < 8) {
    return res.status(400).render("auth/freelancer/signup", {
      errorMessage: "Your password needs to be at least 8 characters",
    });
  }
  Freelancer.findOne({ username }).then((found) => {
    if (found) {
      return res.status(400).render("auth/freelancer/signup", {
        errorMessage: "Username already taken",
      });
    }
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return Freelancer.create({
          username,
          password: hashedPassword,
          email,
          location,
          description,
          skills,
          contact,
        });
      })
      .then((freelancer) => {
        // binds the user to the session object
        req.session.freelancer = freelancer;
        //console.log(freelancer);
        return res.redirect("/freelancerLanding");
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("auth/freelancer/signup", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render("auth/freelancer/signup", {
            errorMessage:
              "Username need to be unique. THe username you chose is already in used.",
          });
        }
        return res
          .status(500)
          .render("auth/freelancer/signup", { errorMessage: error.message });
      });
  });
});
// end of signup of company and freelancer

// login freelancer
router.post("/freelancer/login", shouldNotBeLoggedIn, (req, res) => {
  //console.log("Another console.log");
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).render("index", {
      errorMessage: "Please provide your username",
    });
  }

  //   * Here we use the same logic as above - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).render("index", {
      errorMessage: "Your password needs to be at least 8 characters",
    });
  }
  //console.log("A String in console.log");
  Freelancer.findOne({ username })
    .then((freelancer) => {
      if (!freelancer) {
        return res
          .status(400)
          .render("index", { errorMessage: "Wrong credentials" });
      }

      bcrypt
        .compare(password, freelancer.password)

        .then((isSamePassword) => {
          if (!isSamePassword) {
            return res
              .status(400)
              .render("index", { errorMessage: "Wrong credentials" });
          }
          req.session.freelancer = freelancer;
          //console.log(freelancer);
          // req.session.user = user._id ! better and safer but in this case we saving the entire user object
          return res.redirect("/freelancerLanding");
        });
    })
    .catch((err) => {
      // console.log(err);
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

// login company
router.post("/company/login", shouldNotBeLoggedIn, (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).render("index", {
      errorMessage: "Please provide your username",
    });
  }

  //   * we check the strength of a password
  if (password.length < 8) {
    return res.status(400).render("index", {
      errorMessage: "Your password needs to be at least 8 characters",
    });
  }
  //console.log("A String in console.log");
  Company.findOne({ username })
    .then((company) => {
      if (!company) {
        return res
          .status(400)
          .render("index", { errorMessage: "Wrong credentials" });
      }

      bcrypt
        .compare(password, company.password)

        .then((isSamePassword) => {
          if (!isSamePassword) {
            return res
              .status(400)
              .render("index", { errorMessage: "Wrong credentials" });
          }
          req.session.company = company;
          //console.log(company);
          // req.session.user = user._id ! better and safer but in this case we saving the entire user object
          return res.redirect("/companyLanding");
        });
    })
    .catch((err) => {
      console.log(err);
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

// logout
router.get("/logout", isLoggedIn, (req, res) => {
  // console.log("HEY THERE");
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;
