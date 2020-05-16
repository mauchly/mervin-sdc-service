const mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'photo_gallery',
});

var pg = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'sdc'
  }
});

// const getMainRouteString = (id) => {
//   return new Promise((resolve, reject) => {
//     let select_query_name = `SELECT * FROM Photos WHERE name='${id}'`;
//     db.query(select_query_name, (err, results) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(results);
//     });
//   });
// };

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
    let update_query = `UPDATE Photos SET is_favorite = 1 - is_favorite WHERE listing_id=${id}`;
    db.query(update_query, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const recPhotos = (id) => {
  return new Promise((resolve, reject) => {
    let select_query = `SELECT photo1_b, photo2_b, photo3_b, photo4_b, photo5_b, photo6_b, photo7_b, photo8_b, photo9_b, photo10_b, photo11_b, photo12_b, photo13_b, photo14_b, photo15_b, photo16_b, photo17_b, photo18_b, photo19_b, photo20_b, photo21_b, photo22_b, photo23_b, photo24_b, photo25_b, photo26_b, photo27_b, photo28_b, photo29_b, photo30_b FROM Photos WHERE listing_id=${id}`;
    db.query(select_query, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const deleteListing = () => {

}

const postListing = () => {

}

module.exports = {
  // getMainRouteString,
  getMainRouteNum,
  toggleFavorite,
  recPhotos,
  deleteListing,
  postListing,
};