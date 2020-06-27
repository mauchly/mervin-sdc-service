const redis = require('redis');
const client = redis.createClient();

const getCache = (req, res, next) => {
  // console.log('cache check')
  let id = req.params.id;
  client.get(`l${id}`, (error, result) => {
    if (error) throw error;
    if (result !== null) {
      console.log('cache yes')
      res.send(result);
    } else {
      console.log('cache no')
      next();
    }
  })
}

const getCacheRP = (req, res, next) => {
  let id = req.params.id;
  client.get(`rp${id}`, (error, result) => {
    if (error) throw error;
    if (result !== null) {
      res.send(result);
    } else {
      next();
    }
  })
}

const setCache = (id, results) => {
  client.set(id, results.toString())
}

module.exports = {
  getCache,
  getCacheRP,
  setCache,
}