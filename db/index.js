var pg = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DB_CONNECTION_HOST,
    port : 5432,
    user : process.env.DB_CONNECTION_USER,
    password : process.env.DB_CONNECTION_PASSWORD,
    database : process.env.DB_CONNECTION_DATABASE
  }
});

const getMainRouteNum = (id) => {
  return new Promise((resolve, reject) => {
    pg.from('listings').innerJoin('favorite', 'listings.listing_id', 'favorite.listing_id').where('listings.listing_id', id)
      .then(data => {
        resolve(data)
      })
      .catch(err => { reject(err) })
  });
};

const toggleFavorite = (id) => {
  return new Promise((resolve, reject) => {
    pg('favorite').where('listing_id', id)
      .then(data => {
        pg.from('favorite').where('listing_id', id).update('favorite', !data[0].favorite)
          .then(() => {resolve()})
          .catch(err => {reject(err)})
      })
      .catch(err => {reject(err)})
  });
};

const recPhotos = (id) => {
  return new Promise((resolve, reject) => {
    pg.from('listings').where('listing_id', id)
      .then(data => {
        let object = {};
        data.forEach((each,index) => {
          object[`photo${index+1}_b`] = each.s_photo;
        });
        resolve(object)
      })
      .catch(err => {reject(err)})
  });
};

const deleteListing = (id) => {
  return new Promise((resolve, reject) => {
    pg.from('listings').where('listing_id', id).del()
      .then(data => {
        console.log(data)
        resolve()
      })
      .catch(err => {reject(err)})
  });
}

const postListing = (photos) => {
  return new Promise((resolve, reject) => {
    photos.forEach(each => {
      pg.from('listings').insert(each)
        .then(data => {
          console.log(data)
          resolve()
        })
        .catch(err => {reject(err)})
    })
  });
}

const updateListing = (id, newId) => {
  return new Promise((resolve, reject) => {
    pg('listings').where('listing_id', id).update({listing_id: newId})
      .then(data => {
        console.log(data)
        resolve()
      })
      .catch(err => {reject(err)})
  });
}

module.exports = {
  getMainRouteNum,
  toggleFavorite,
  recPhotos,
  deleteListing,
  postListing,
  updateListing,
};