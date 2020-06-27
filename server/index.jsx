require('newrelic');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5555;
const bodyParser = require('body-parser');
const {getMainRouteNum, toggleFavorite, recPhotos, deleteListing, postListing, updateListing}  = require('../db/index.js');
const compression = require('compression');
const _ = require('lodash');
const {getCache, getCacheRP, setCache} = require('./redis.js');

// APP
import React from 'react';
import PhotoService from '../client/src/PhotoService.jsx';
import ReactDOMServer from 'react-dom/server.js';
import template from './template/template.js';
import {refactor} from './template/functions.js'

// Middleware
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
app.get('/:id', getCache, (req, res) => {
  let id = req.params.id;
  let listingInfo;
  getMainRouteNum(id)
  .then((results) => {
    listingInfo = refactor(results);
    return ReactDOMServer.renderToString(<PhotoService initialData={listingInfo}/>);
  })
  .then((html) => {
    var final = template(html, listingInfo)
    setCache(`l${id}`, final);
    res.send(final)
  })
  .catch((err) => {console.log('error', err)});

});

// GET list of s_photos
app.get('/:id/rec-photos', getCacheRP, (req, res) => {
  let id = req.params.id;
  recPhotos(id)
    .then((results) => {
      setCache(`rp${id}`, results);
      res.send(results);
    })
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


