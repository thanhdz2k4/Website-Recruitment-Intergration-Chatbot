const routerAccount = require("./account.js");
const routerJobPosting = require("./jobPosting.js");

module.exports = (app) => {
  app.use("/api/account", routerAccount);
  app.use("/api/jobPosting", routerJobPosting);
};
