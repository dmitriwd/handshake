module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.freelancer && !req.session.company) {
    return res.redirect("/login");
  }
  // if (
  //   (!req.session.freelancer && req.session.company) ||
  //   (req.session.freelancer && !req.session.company)
  // ) {
  //   return res.redirect("/login");
  // }

  next();
};
