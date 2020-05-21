function generateRandomNumber(userContext, events, done) {
  let dice = Math.floor((Math.random() * 10) + 1)
  if (dice < 8) {
    // 70% weighted probability of hitting 30% of last 10% of listings
    userContext.vars.listing = Math.floor((9999999 - Math.random() * 300000))
  } else {
    // 30% weighted probability of hitting 70% of last 10% of listings
    userContext.vars.listing = Math.floor((Math.random() * 700000) + 9000000)
  }
  return done();
}
module.exports = {
  generateRandomNumber
};