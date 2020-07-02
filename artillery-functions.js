function generateRandomNumber(userContext, events, done) {
  let dice = Math.floor((Math.random() * 10) + 1)
  if (dice < 9) {
    // 90% weighted probability of hitting 10% of last 10% of listings
    userContext.vars.listing = Math.floor((9999999 - Math.random() * 100000))
  } else {
    // 10% weighted probability of hitting 90% of last 10% of listings
    userContext.vars.listing = Math.floor((Math.random() * 900000) + 9000000)
  }
  // userContext.vars.listing = Math.floor((9999999 - Math.random() * 10))

  return done();
}
module.exports = {
  generateRandomNumber
};