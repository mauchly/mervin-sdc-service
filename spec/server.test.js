const request = require('superagent');
// const supertest = require('supertest');
const React = require('react');
const ReactDOM = require('react-dom');
const Enzyme = require('enzyme');
const { mount, shallow, render } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const puppeteer = require('puppeteer');
const pageUrl = 'http://ec2-54-183-138-229.us-west-1.compute.amazonaws.com:3002/10001';
const renderer = require("react-test-renderer");
const $ = require('jquery');
const polyfill = require('babel-polyfill');
const babelPolyfill = require('babel-polyfill');
const regenerator = require('regenerator-runtime/runtime');
const PhotoService = require('../client/src/PhotoService.jsx').default;
const { configure } = require('enzyme');
configure({ adapter: new Adapter() });
jest.mock('../client/src/PhotoService.jsx');
const listing = {
  id: 1,
  listing_id: 10001,
  name: 'Super_Cute_Retro_Airstream',
  photo1_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/coverPics/Cover01Large.jpg',
  photo1_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/coverPics/Cover01Small.jpg',
  photo1_caption: "This is The Dixie Daisy! We think you'll LOVE staying here.",
  photo2_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic02Large.jpg',
  photo2_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic02Small.jpg',
  photo2_caption: 'Super Cute Retro Airstream',
  photo3_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic03Large.jpg',
  photo3_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic03Small.jpg',
  photo3_caption: 'Super Cute Retro Airstream',
  photo4_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic04Large.jpg',
  photo4_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic04Small.jpg',
  photo4_caption: 'The Dixie Daisy backs up to the beautiful Smith Creek with 12 private acres to explore.',
  photo5_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic05Large.jpg',
  photo5_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic05Small.jpg',
  photo5_caption: 'Mood lighting for an evening dip in the hot tub',
  photo6_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic06Large.jpg',
  photo6_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic06Small.jpg',
  photo6_caption: 'The treehouse is a great place for a romantic picnic!',
  photo7_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic07Large.jpg',
  photo7_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic07Small.jpg',
  photo7_caption: 'Queen size bed on an antique iron bed frame',
  photo8_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic08Large.jpg',
  photo8_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic08Small.jpg',
  photo8_caption: 'Hammock bliss…',
  photo9_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic09Large.jpg',
  photo9_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic09Small.jpg',
  photo9_caption: 'The living room has a full couch, table and chair, satellite tv, games, and books.',
  photo10_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic10Large.jpg',
  photo10_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic10Small.jpg',
  photo10_caption: 'Super Cute Retro Airstream',
  photo11_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic11Large.jpg',
  photo11_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic11Small.jpg',
  photo11_caption: 'Strum your guitar and crack open and ice cold beer next to the fire',
  photo12_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic12Large.jpg',
  photo12_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic12Small.jpg',
  photo12_caption: 'Super Cute Retro Airstream',
  photo13_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic13Large.jpg',
  photo13_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic13Small.jpg',
  photo13_caption: 'Super Cute Retro Airstream',
  photo14_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic14Large.jpg',
  photo14_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic14Small.jpg',
  photo14_caption: 'Super Cute Retro Airstream',
  photo15_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic15Large.jpg',
  photo15_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic15Small.jpg',
  photo15_caption: 'Dine al fresco under the twinkle lights.',
  photo16_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic16Large.jpg',
  photo16_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic16Small.jpg',
  photo16_caption: "The kitchen is stocked with pots, pans, dishes, and utensils. There's a gas stove and refrigerator, too.",
  photo17_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic17Large.jpg',
  photo17_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic17Small.jpg',
  photo17_caption: 'Super Cute Retro Airstream',
  photo18_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic18Large.jpg',
  photo18_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic18Small.jpg',
  photo18_caption: 'Super Cute Retro Airstream',
  photo19_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic19Large.jpg',
  photo19_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic19Small.jpg',
  photo19_caption: 'The outdoor shower has clothing hooks, a bench, and is big enough for two!',
  photo20_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic20Large.jpg',
  photo20_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic20Small.jpg',
  photo20_caption: 'Take your morning shower under the canopy of the elm trees. What a way to start the day!',
  photo21_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic21Large.jpg',
  photo21_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic21Small.jpg',
  photo21_caption: 'Super Cute Retro Airstream',
  photo22_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic22Large.jpg',
  photo22_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic22Small.jpg',
  photo22_caption: "The bathroom has been hard plumbed with a real toilet. There's an interior shower and hairdryer, too.",
  photo23_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic23Large.jpg',
  photo23_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic23Small.jpg',
  photo23_caption: 'The interior shower',
  photo24_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic24Large.jpg',
  photo24_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic24Small.jpg',
  photo24_caption: "Isn't she pretty all lit up at night?",
  photo25_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic25Large.jpg',
  photo25_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic25Small.jpg',
  photo25_caption: "Don't forget the charcoal and steaks for your bbq dinner!",
  photo26_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic26Large.jpg',
  photo26_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic26Small.jpg',
  photo26_caption: 'Super Cute Retro Airstream',
  photo27_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic27Large.jpg',
  photo27_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic27Small.jpg',
  photo27_caption: 'Super Cute Retro Airstream',
  photo28_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic28Large.jpg',
  photo28_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic28Small.jpg',
  photo28_caption: 'cowgirl curtains',
  photo29_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic29Large.jpg',
  photo29_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic29Small.jpg',
  photo29_caption: 'Super Cute Retro Airstream',
  photo30_a: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic30Large.jpg',
  photo30_b: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic30Small.jpg',
  photo30_caption: 'Super Cute Retro Airstream',
  updatedAt: null
};
const recPhotosMock = {
  photo1: 'https://fec-photos.s3-us-west-1.amazonaws.com/coverPics/Cover01Small.jpg',
  photo2: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic02Small.jpg',
  photo3: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic03Small.jpg',
  photo4: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic04Small.jpg',
  photo5: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic05Small.jpg',
  photo6: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic06Small.jpg',
  photo7: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic07Small.jpg',
  photo8: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic08Small.jpg',
  photo9: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic09Small.jpg',
  photo10: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic10Small.jpg',
  photo11: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic11Small.jpg',
  photo12: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic12Small.jpg',
  photo13: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic13Small.jpg',
  photo14: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic14Small.jpg',
  photo15: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic15Small.jpg',
  photo16: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic16Small.jpg',
  photo17: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic17Small.jpg',
  photo18: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic18Small.jpg',
  photo19: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic19Small.jpg',
  photo20: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic20Small.jpg',
  photo21: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic21Small.jpg',
  photo22: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic22Small.jpg',
  photo23: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic23Small.jpg',
  photo24: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic24Small.jpg',
  photo25: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic25Small.jpg',
  photo26: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic26Small.jpg',
  photo27: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic27Small.jpg',
  photo28: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic28Small.jpg',
  photo29: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic29Small.jpg',
  photo30: 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic30Small.jpg'
};

describe("/listing-info route", () => {
  test("should respond to a valid GET request with listing object", async (done) => {
    const responseMock = listing;
    const response = await request
      .get('http://ec2-54-183-138-229.us-west-1.compute.amazonaws.com:3002/listing-info', {listingId: '10001'})
      .then((response) => {
        delete response.body[0].createdAt;
        delete response.body[0].is_favorite;
        expect(response.statusCode).toBe(200);
        expect(JSON.stringify(response.body[0])).toBe(JSON.stringify(listing));
        done();
      })
      .catch((err) => {
        console.log('/listing-info route error', err);
        return false;
        done();
      });
  });
});

describe("/favorite route", () => {
  test("should respond to a post to a valid POST to /favorite with a confirmation", async (done) => {
    const responseMock = '(Rows matched: 1  Changed: 1  Warnings: 0';
    const response = await request
    .post('http://ec2-54-183-138-229.us-west-1.compute.amazonaws.com:3002/favorite', {listingId: '10001'})
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual(responseMock);
      done();
    })
    .catch((err) => {
      console.log('/favorite route error', err);
      return false;
      done();
    });
  });
});

describe("/rec-photos route", () => {
  test("should respond to a valid GET request with an array of all small(b) listing photos", async (done) => {
    const responseMock = recPhotosMock;
    const response = await request
    .get('http://ec2-54-183-138-229.us-west-1.compute.amazonaws.com:3002/rec-photos', {listingId: '10001'})
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(responseMock);
      done();
    })
    .catch((err) => {
      console.log('/rec-photos route error', err);
      return false;
      done();
    })
  });
});