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
const Carousel = require('../client/src/components/Carousel.jsx').default;
const stable = require('core-js/stable');
const regenerator = require('regenerator-runtime/runtime');
const { configure } = require('enzyme');
configure({ adapter: new Adapter() });
jest.mock('../client/src/components/Carousel.jsx');

describe('Carousel', () => {

  const wrapper = shallow(<Carousel />);

  test('should be defined', () => {
    expect(Carousel).toBeDefined();
  });
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

});


// End-to-end (functional) tests

let page;
let browser;
const width = 1280;
const height = 720;

beforeAll(async() => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

describe('Carousel Component', () => {
  beforeEach(async () => {
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  });

  test('dynamic styling is correct', async () => {
    await page.click('#photo2');
    let preNextPrev1 = await page.$eval('#prevAndNextImagesContainer', (e) => e.innerHTML.split('style="')[1].split(';')[0]);
    let preNextPrev2 = await page.$eval('#prevAndNextImagesContainer', (e) => e.innerHTML.split('style="')[2].split(';')[0]);
    expect(preNextPrev1).toBe('border: none');
    expect(preNextPrev2).toBe('border: 2px solid rgb(64, 64, 64)');

    await page.click('#carouselLeftButton');
    let preNextPrev3 = await page.$eval('#prevAndNextImagesContainer', (e) => e.innerHTML.split('style="')[1].split(';')[0]);
    let preNextPrev4 = await page.$eval('#prevAndNextImagesContainer', (e) => e.innerHTML.split('style="')[2].split(';')[0]);
    expect(preNextPrev3).toBe('border: 2px solid rgb(64, 64, 64)');
    expect(preNextPrev4).toBe('border: none');
  });
});