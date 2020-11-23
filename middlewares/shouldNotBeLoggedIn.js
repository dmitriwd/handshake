module.exports = (req, res, next) => {
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  if (req.session.freelancer || req.session.company) {
    return res.redirect("/");
  }
  next();
};
