require('newrelic')
const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
const path = require('path');
// const getMainRouteString = require('../db/index.js').getMainRouteString;
const {getMainRouteNum, toggleFavorite, recPhotos, deleteListingPhoto, postListingPhoto}  = require('../db/index.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get('/:id/rec-photos', (req, res) => {
  let id = req.params.id;
  recPhotos(id)
    .then((results) => {
      results = results[0];
      let keys = Object.keys(results);
      let newKey;
      for (let key of keys) {
        if (results[key] === null) {
          delete results[key];
        } else {
          newKey = key.split('_').shift();
          results[newKey] = results[key];
          delete results[key];
        }
      }
    res.send(results);
    })
  .catch((err) => {console.log('error', err);});
});

app.get('/listing-info', (req, res) => {
  let id = Number(req.query.listingId);
  getMainRouteNum(id)
    .then((results) => {res.send(results);})
    .catch((err) => {console.log('error', err);});
});

// app.use('/:id', express.static(__dirname + '/../public/index.html'));
app.get('/:id', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname + '/../public/'),
  });
});

app.delete('/deleteListing', (req, res) => {
  let id = Number(req.query.listingId);
  deleteListing(id)
    .then((data) => {res.send(data)})
    .catch((err) => {console.log(err)})
})

app.post('/postListing', (req, res) => {
  let listing = req.body.listing;
  postListing(id)
    .then((data) => {res.send(data)})
    .catch((err) => {console.log(err)})
})
// app.put()
// app.patch()



app.post('/favorite', (req, res) => {
  let id = req.body.listingId;
  console.log('id', id)
  toggleFavorite(id)
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    console.log('error', err);
  });
});




module.exports = app;