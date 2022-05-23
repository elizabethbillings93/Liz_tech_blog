// If there is no user Id then redirect to login
const withAuth = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/login");
    }else{
      next();
}
};
  module.exports = withAuth;