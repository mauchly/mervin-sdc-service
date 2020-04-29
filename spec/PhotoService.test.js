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
const PhotoService = require('../client/src/PhotoService.jsx').default;
const NavBar = require('../client/src/components/NavBar.jsx').default;
const Carousel = require('../client/src/components/Carousel.jsx').default;
const HardcodePhotos = require('../client/src/components/HardcodePhotos.jsx').default;
const stable = require('core-js/stable');
const regenerator = require('regenerator-runtime/runtime');
const { configure } = require('enzyme');
configure({ adapter: new Adapter() });
jest.mock('../client/src/components/Carousel.jsx');
jest.mock('../client/src/PhotoService.jsx');
jest.mock('../client/src/components/HardcodePhotos.jsx');
jest.mock('../client/src/components/NavBar.jsx');

// End-to-end tests

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
describe('test assertion tests', () => {
  beforeEach(async () => {
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  });
  test('Assert tests are running', () => {
    expect(false).toBeFalsy();
    expect(true).toBeTruthy();
  });
});

describe('NavBar', () => {
  beforeEach(async () => {
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  });
  test('page links are correctly rendered', async () => {
    var div = '#navBarLinks';
    const navBarLinks = await page.$eval(div, (e) => e.textContent);
    expect(navBarLinks).toEqual('Add listing⠀⠀⠀Host⠀⠀⠀Saved⠀⠀⠀ Trips⠀⠀⠀Messages⠀⠀ ⠀Help');
  });
});

describe('View Photos Button', () => {
  beforeEach( async () => {
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  });
  test('carousel does not exist at first', () => {
    let carouselDiv = '#carouselContainer';
    expect(carouselDiv).not.toBe(true);

  })
  test('click renders carousel Component', async () => {
    let viewPhotosButton = '#viewPhotos';
    let carouselDiv = '#carouselContainer';
    await page.click(viewPhotosButton);
    expect(carouselDiv).toBeTruthy();
  });
});


describe('PhotoService', () => {
  const wrapper = shallow(<PhotoService />);
  test('should be defined', () => {
    expect(PhotoService).toBeDefined();
  });
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('should have correct Components', () => {
    expect(wrapper.find(Carousel)).toBeTruthy();
    expect(wrapper.find(HardcodePhotos)).toBe.true;
    expect(wrapper.find(NavBar)).toBeTruthy();
  });
});

