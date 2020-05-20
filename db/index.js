var pg = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'sdc'
  }
});

const getMainRouteNum = (id) => {
  return new Promise((resolve, reject) => {
    pg.from('listings').innerJoin('favorite', 'listings.listing_id', 'favorite.listing_id').where('listings.listing_id', id)
      .then(data => {
        console.log(data)
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

const deleteListingPhoto = (listingDetails) => {

}

const postListingPhoto = (listingDetails) => {

}

// postListing(-1)

module.exports = {
  // getMainRouteString,
  getMainRouteNum,
  toggleFavorite,
  recPhotos,
  deleteListingPhoto,
  postListingPhoto,
};