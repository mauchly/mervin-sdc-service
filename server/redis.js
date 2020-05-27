const redis = require('redis');
const client = redis.createClient();

const getCache = (req, res, next) => {
  let id = req.params.id;
  // console.log('getcache')
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

// cache middleware for '/:id/rec-photos'
// let cacheTwo = function (req, res, next) {
//   let id = req.path.split('/')[1];
//   if (id === 'rec-photos') {
//     id = 10001;
//   }
//   client.get(id, (err, data) => {
//     if (err) {
//       console.log('errrrr')
//       throw err;
//     }
//     if (data !== null) {
//       data =  JSON.parse(data);
//       res.send(JSON.stringify(data));
//     } else {
//       console.log('next')
//       next()
//     }
//   })
// }


module.exports = {
  getCache,
  setCache
}