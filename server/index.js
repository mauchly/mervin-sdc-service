require('newrelic')
const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
const path = require('path');
const {getMainRouteNum, toggleFavorite, recPhotos, deleteListing, postListing, updateListing}  = require('../db/index.js');
const {getCache, setCache} = require('./redis.js')
const {template} = require('./render/render.js');
// const PhotoService = require('./render/template.js');

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

// GET main landing page
app.get('/:id', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname + '/../public/'),
  });
  // let id = req.params.id;
  // getMainRouteNum(id)
  //   .then((results) =>  {
  //     let page = template(results)
  //     res.send(page)
  //   })
  //   .catch((err) => {console.log('error', err);});

});

// GET list of s_photos
app.get('/:id/rec-photos', getCache, (req, res) => {
  let id = req.params.id;
  recPhotos(id)
    .then((results) => {
      setCache(id, results);
      res.send(results);
    })
    .catch((err) => {console.log('error', err);});
});

// GET listing info
app.get('/:id/listing-info', (req, res) => {
  let id = req.params.id;
  getMainRouteNum(id)
    .then((results) => {res.send(results);})
    .catch((err) => {console.log('error', err);});
});

// POST listing info
app.post('/postListing', (req, res) => {
  let listing = req.body.listing;
  postListing(listing)
    .then((data) => {res.send(data)})
    .catch((err) => {console.log(err)})
})

// POST favorite
app.post('/favorite', (req, res) => {
  let id = req.body.listingId;
  console.log('id', id)
  toggleFavorite(id)
    .then((results) => {res.send(results);})
    .catch((err) => {console.log('error', err);});
});


// DELETE listing
app.delete('/:id/deleteListing', (req, res) => {
  let id = req.params.id;
  deleteListing(id)
    .then((data) => {res.send(data)})
    .catch((err) => {console.log(err)})
})

// PUT update listing
app.put('/:id/updateListing', (req, res) => {
  let id = req.params.id;
  let listing = req.body.listing;
  updateListing(id, listing)
    .then((data) => {res.send(data)})
    .catch((err) => {console.log(err)})
})


module.exports = app;