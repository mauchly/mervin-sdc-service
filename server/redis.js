const redis = require('redis');
const client = redis.createClient();

const getCache = (req, res, next) => {
  let id = req.params.id;
  client.get(`listing:${id}`, (error, result) => {
    if (error) throw error;
    if (result !== null) {
      res.send(result);
    } else {
      next();
    }
  })
}

const setCache = (id, results) => {
  // console.log(results)
  client.set(`listing:${id}`, JSON.stringify(results))
}

module.exports = {
  getCache,
  setCache
}