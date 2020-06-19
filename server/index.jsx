require('newrelic');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5555;
const bodyParser = require('body-parser');
const path = require('path');
const {getMainRouteNum, toggleFavorite, recPhotos, deleteListing, postListing, updateListing}  = require('../db/index.js');
const {getCache, setCache} = require('./redis.js');
const compression = require('compression');

// APP
import React from 'react';
import PhotoService from '../client/src/PhotoService.jsx';
import ReactDOMServer from 'react-dom/server.js';
import template from './template/template.js';

app.use(express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());

app.listen(port, () => {console.log(`Server listening on port ${port}`)});

// GET main landing page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public','test.txt'));
// });

app.get('/:id', (req, res) => {
  var appString = ReactDOMServer.renderToString(<PhotoService/>)
  var html = template(appString);
  res.send(html)
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


// module.exports = app;