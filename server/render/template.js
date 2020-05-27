"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

var _NavBar = _interopRequireDefault(require("./components/NavBar.jsx"));

var _PhotoGallery = _interopRequireDefault(require("./components/PhotoGallery.jsx"));

var _Carousel = _interopRequireDefault(require("./components/Carousel.jsx"));

var _Empty = _interopRequireDefault(require("./components/Empty.jsx"));

var _HardcodePhotos = _interopRequireDefault(require("./components/HardcodePhotos.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PhotoService extends _react.default.Component {
  constructor() {
    super();
    this.state = {
      navBar: _NavBar.default,
      photoGallery: _PhotoGallery.default,
      carousel: _Empty.default,
      currentListing: [],
      is_Favorite: false,
      currentPhotoUrl: null,
      s3PhotoBucketNumber: null,
      currentPhotoIndexInListing: 1,
      numOfCurrentListingPhotos: 30,
      currentPhotoCaption: 'Super Cool Listing!',
      nextPrevImages: [],
      nextPrevBorders: ['2px solid #404040', 'none', 'none', 'none'],
      nextPrevOpacities: ['100%', '70%', '70%', '70%']
    };
  }

  handleViewPhotos(e) {
    e.preventDefault;
    this.setState({
      carousel: _Carousel.default,
      nextPrevBorders: ['2px solid #404040', 'none', 'none', 'none'],
      nextPrevOpacities: ['100%', '70%', '70%', '70%']
    });
  }

  dupGetNumOfListingPhotos(listing) {
    let dupPhotosArray = Object.keys(listing).slice(4, -3);
    let dupListingSmallUrls = [];
    let count = 0;

    for (let key of dupPhotosArray) {
      if (listing[key]) {
        if (key.split('').slice(-1) == 'b') {
          dupListingSmallUrls.push(listing[key]);
        }

        count++;
      }
    }

    return Math.ceil(count / 3);
  }


  //POSTGRES
  componentDidMount() {
    let id = window.location.pathname.substr(1);

    _jquery.default.ajax({
      method: 'GET',
      url: `http://54.177.223.78:3002/${id}/listing-info`,
      success: result => {
        let numOfPhotos = result.length;
        result = this.refactor(result);
        this.setState(() => ({
          currentListing: result,
          currentPhotoUrl: result.photo1_a,
          nextPrevImages: [result.photo1_b, result.photo2_b, result.photo3_b, result.photo4_b],
          numOfCurrentListingPhotos: numOfPhotos,
          currentPhotoCaption: result.photo1_caption
        }));
      },
      error: err => {
        console.log('error', err);
      }
    });
  }

  refactor(result) {
    let object = {};
    object.listing_id = result[0].listing_id;
    result.forEach((each, index) => {
      object[`photo${index + 1}_a`] = each.l_photo;
      object[`photo${index + 1}_b`] = each.s_photo;
      object[`photo${index + 1}_caption`] = each.alt_txt;
    });
    return object;
  }

  handleNextPrevClick(e) {
    e.preventDefault();
    let photoNumber = this.state.currentPhotoIndexInListing;
    let max = this.state.numOfCurrentListingPhotos;
    let id = Number(e.target.id);
    let $rightButton = (0, _jquery.default)('#carouselRightButton')[0];
    let $leftButton = (0, _jquery.default)('#carouselLeftButton')[0];

    if (photoNumber === 1) {
      if (id === 1) {
        $rightButton.click();
      } else if (id === 2) {
        $rightButton.click();
        $rightButton.click();
      } else {
        if (id !== 0) {
          $rightButton.click();
          $rightButton.click();
          $rightButton.click();
        }
      }
    } else if (photoNumber === max) {
      if (id === 2) {
        $leftButton.click();
      } else if (id === 1) {
        console.log('clicking twice');
        $leftButton.click();
        $leftButton.click();
      } else {
        if (id !== 3) {
          $leftButton.click();
          $leftButton.click();
          $leftButton.click();
        }
      }
    } else {
      let current = this.state.nextPrevOpacities.indexOf('100%');

      if (current > id) {
        if (current - id === 2) {
          $leftButton.click();
          $leftButton.click();
        } else if (current - id === 1) {
          $leftButton.click();
        }
      } else {
        if (id - current === 1) {
          $rightButton.click();
        } else if (id - current === 2) {
          $rightButton.click();
          $rightButton.click();
        }
      }
    }
  }

  handleSearchBar(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('default prevented');
    }
  }

  handleExit(e) {
    e.preventDefault();
    this.setState({
      carousel: _Empty.default,
      photoGallery: _PhotoGallery.default,
      currentPhotoUrl: this.state.currentListing.photo1_a,
      currentPhotoCaption: this.state.currentListing.photo1_caption,
      currentPhotoIndexInListing: 1,
      nextPrevImages: [this.state.currentListing.photo1_b, this.state.currentListing.photo2_b, this.state.currentListing.photo3_b, this.state.currentListing.photo4_b]
    });
  }

  handleLeftClick(e) {
    e.preventDefault();
    console.log('HERE', (0, _jquery.default)('#prevAndNextImagesContainer')[0].children[0].style.cssText);
    let photoNumber = this.state.currentPhotoIndexInListing;
    let max = this.state.numOfCurrentListingPhotos;

    if (photoNumber !== 1) {
      this.setState({
        currentPhotoUrl: this.state.currentListing[`photo${photoNumber - 1}_a`],
        currentPhotoIndexInListing: --this.state.currentPhotoIndexInListing,
        currentPhotoCaption: this.state.currentListing[`photo${this.state.currentPhotoIndexInListing}_caption`]
      });
    }

    if (photoNumber === max) {
      this.setState({
        nextPrevBorders: ['none', 'none', '2px solid #404040', 'none'],
        nextPrevOpacities: ['70%', '70%', '100%', '70%']
      });
    } else if (photoNumber < max && photoNumber - 3 >= 1) {
      this.setState({
        nextPrevImages: [this.state.currentListing[`photo${photoNumber - 3}_b`], this.state.currentListing[`photo${photoNumber - 2}_b`], this.state.currentListing[`photo${photoNumber - 1}_b`], this.state.currentListing[`photo${photoNumber}_b`]],
        nextPrevBorders: ['none', 'none', '2px solid #404040', 'none'],
        nextPrevOpacities: ['70%', '70%', '100%', '70%']
      });
    } else {
      this.setState(prevState => {
        return {
          nextPrevBorders: ['none', 'none', 'none', 'none'].map((x, i) => {
            if (i === prevState.nextPrevBorders.indexOf('2px solid #404040') - 1 || prevState.nextPrevBorders.indexOf('2px solid #404040') === 0 && i === 0) {
              return '2px solid #404040';
            } else {
              return x;
            }
          }),
          nextPrevOpacities: ['70%', '70%', '70%', '70%'].map((x, i) => {
            if (i === prevState.nextPrevOpacities.indexOf('100%') - 1 || prevState.nextPrevOpacities.indexOf('100%') === 0 && i === 0) {
              return '100%';
            } else {
              return x;
            }
          })
        };
      });
    }
  }

  handleRightClick(e) {
    e.preventDefault();
    console.log('ID', e.target.id);
    console.log('before photo Url', this.state.currentPhotoUrl);
    let photoNumber = this.state.currentPhotoIndexInListing;
    let max = this.state.numOfCurrentListingPhotos;

    if (photoNumber !== max) {
      this.setState({
        currentPhotoUrl: this.state.currentListing[`photo${photoNumber + 1}_a`],
        currentPhotoIndexInListing: ++this.state.currentPhotoIndexInListing,
        currentPhotoCaption: this.state.currentListing[`photo${this.state.currentPhotoIndexInListing}_caption`]
      });
    }

    if (photoNumber > 1 && photoNumber + 3 <= max) {
      this.setState({
        nextPrevImages: [this.state.currentListing[`photo${photoNumber}_b`], this.state.currentListing[`photo${photoNumber + 1}_b`], this.state.currentListing[`photo${photoNumber + 2}_b`], this.state.currentListing[`photo${photoNumber + 3}_b`]],
        nextPrevBorders: ['none', '2px solid #404040', 'none', 'none'],
        nextPrevOpacities: ['70%', '100%', '70%', '70%']
      });
    } else {
      this.setState(prevState => {
        return {
          nextPrevBorders: ['none', 'none', 'none', 'none'].map((x, i) => {
            if (i === prevState.nextPrevBorders.indexOf('2px solid #404040') + 1 || prevState.nextPrevBorders.indexOf('2px solid #404040') === 3 && i === 3) {
              return '2px solid #404040';
            } else {
              return x;
            }
          }),
          nextPrevOpacities: ['70%', '70%', '70%', '70%'].map((x, i) => {
            if (i === prevState.nextPrevOpacities.indexOf('100%') + 1 || prevState.nextPrevOpacities.indexOf('100%') === 3 && i === 3) {
              return '100%';
            } else {
              return x;
            }
          })
        };
      });
    }
  }

  handlePhotoClick(e) {
    e.preventDefault();
    let url = e.target.src;
    let id = Number(e.target.id.split('').pop());
    console.log('url', url);
    console.log('id', id);

    if (id < 5) {
      this.setState({
        carousel: _Carousel.default,
        currentPhotoUrl: url,
        currentPhotoIndexInListing: id,
        currentPhotoCaption: this.state.currentListing[`photo${id}_caption`],
        nextPrevBorders: ['none', 'none', 'none', 'none'].map((x, i) => {
          if (i === id - 1) {
            return '2px solid #404040';
          } else {
            return x;
          }
        }),
        nextPrevOpacities: ['70%', '70%', '70%', '70%'].map((x, i) => {
          if (i === id - 1) {
            return '100%';
          } else {
            return x;
          }
        })
      });
    } else if (id === 5) {
      this.setState({
        nextPrevImages: [this.state.currentListing.photo2_b, this.state.currentListing.photo3_b, this.state.currentListing.photo4_b, this.state.currentListing.photo5_b],
        carousel: _Carousel.default,
        currentPhotoUrl: url,
        currentPhotoIndexInListing: id,
        currentPhotoCaption: this.state.currentListing[`photo${id}_caption`],
        nextPrevBorders: ['none', 'none', 'none', '2px solid #404040'],
        nextPrevOpacities: ['70%', '70%', '70%', '100%']
      });
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      id: "photoGalleryService"
    }, /*#__PURE__*/_react.default.createElement(this.state.navBar, {
      handleSearchBar: this.handleSearchBar.bind(this)
    }), /*#__PURE__*/_react.default.createElement(this.state.photoGallery, {
      state: this.state,
      handleViewPhotos: this.handleViewPhotos.bind(this),
      handlePhotoClick: this.handlePhotoClick.bind(this)
    }), /*#__PURE__*/_react.default.createElement(this.state.carousel, {
      state: this.state,
      handleExit: this.handleExit.bind(this),
      handleNextPrevClick: this.handleNextPrevClick.bind(this),
      handleLeftClick: this.handleLeftClick.bind(this),
      handleRightClick: this.handleRightClick.bind(this)
    }), /*#__PURE__*/_react.default.createElement(_HardcodePhotos.default, null));
  }

}

;
var _default = PhotoService;
exports.default = _default;