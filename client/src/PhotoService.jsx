import React from 'react';
import $ from 'jquery';
import PhotoGallery from './components/PhotoGallery.jsx';
import Carousel from './components/Carousel.jsx';

class PhotoService extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      overlay: false, // added
      currentListing: [],
      is_Favorite: false,
      currentPhotoUrl: null,
      currentPhotoIndexInListing: 1,
      numOfCurrentListingPhotos: 30,
      currentPhotoCaption: 'Super Cool Listing!',
      nextPrevImages: [],
      nextPrevBorders: ['2px solid #404040', 'none', 'none', 'none'],
      nextPrevOpacities: ['100%', '70%', '70%', '70%']
    }
  };

  componentDidMount() {
    let id = window.location.pathname.substr(1)
    $.ajax({
      method: 'GET',
      url: `http://52.52.28.79/${id}/listing-info`,
      success: (result) => {
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
      error: (err) => {console.log('error', err);}
    });
  };

  refactor (result) {
    let object = {};
    object.listing_id = result[0].listing_id;
    result.forEach((each, index) => {
      object[`photo${index+1}_a`] = each.l_photo;
      object[`photo${index+1}_b`] = each.s_photo;
      object[`photo${index+1}_caption`] = each.alt_txt;
    })
    return object;
  }

  handleViewPhotos (e) {
    e.preventDefault();
    this.setState({
      overlay: true,
      nextPrevBorders: ['2px solid #404040', 'none', 'none', 'none'],
      nextPrevOpacities: ['100%', '70%', '70%', '70%']
    });
  };

  handleNextPrevClick(e) {
    e.preventDefault();
    let photoNumber = this.state.currentPhotoIndexInListing;
    let max = this.state.numOfCurrentListingPhotos;
    let id = Number(e.target.id);
    let $rightButton = $('#carouselRightButton')[0];
    let $leftButton = $('#carouselLeftButton')[0];
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
        console.log('clicking twice')
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
  };

  handleSearchBar (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  handleExit(e) {
    e.preventDefault();
    this.setState({
      overlay: false,
      currentPhotoUrl: this.state.currentListing.photo1_a,
      currentPhotoCaption: this.state.currentListing.photo1_caption,
      currentPhotoIndexInListing: 1,
      nextPrevImages: [this.state.currentListing.photo1_b, this.state.currentListing.photo2_b, this.state.currentListing.photo3_b, this.state.currentListing.photo4_b]
    });
  };

  handleLeftClick(e) {
    e.preventDefault();
    let photoNumber = this.state.currentPhotoIndexInListing;
    let max = this.state.numOfCurrentListingPhotos;
    if (photoNumber !== 1) {
      this.setState({
        currentPhotoUrl: this.state.currentListing[`photo${photoNumber - 1}_a`],
        currentPhotoIndexInListing: --this.state.currentPhotoIndexInListing,
        currentPhotoCaption: this.state.currentListing[`photo${this.state.currentPhotoIndexInListing}_caption`]
      })
    }
    if (photoNumber === max) {
      this.setState({
        nextPrevBorders: ['none', 'none', '2px solid #404040', 'none'],
        nextPrevOpacities: ['70%', '70%', '100%', '70%']
      })
    } else if (photoNumber < max && photoNumber - 3 >= 1) {
      this.setState({
        nextPrevImages: [this.state.currentListing[`photo${photoNumber - 3}_b`], this.state.currentListing[`photo${photoNumber - 2}_b`], this.state.currentListing[`photo${photoNumber - 1}_b`], this.state.currentListing[`photo${photoNumber}_b`]],
        nextPrevBorders: ['none', 'none', '2px solid #404040', 'none'],
        nextPrevOpacities: ['70%', '70%', '100%', '70%']
      })
    } else {
      this.setState((prevState) => {
        return {
          nextPrevBorders: ['none', 'none', 'none', 'none'].map((x, i) => {
            if (i === prevState.nextPrevBorders.indexOf('2px solid #404040') - 1 || (prevState.nextPrevBorders.indexOf('2px solid #404040') === 0 && i === 0)) {
              return '2px solid #404040';
            } else {
              return x;
            }
          }),
          nextPrevOpacities: ['70%', '70%', '70%', '70%'].map((x, i) => {
            if (i === prevState.nextPrevOpacities.indexOf('100%') - 1 || (prevState.nextPrevOpacities.indexOf('100%') === 0 && i === 0)) {
              return '100%';
            } else {
              return x;
            }
          })
        }
      })
    }
  };

  handleRightClick(e) {
    e.preventDefault();
    let photoNumber = this.state.currentPhotoIndexInListing;
    let max = this.state.numOfCurrentListingPhotos;
    if (photoNumber !== max) {
      this.setState({
        currentPhotoUrl: this.state.currentListing[`photo${photoNumber + 1}_a`],
        currentPhotoIndexInListing: ++this.state.currentPhotoIndexInListing,
        currentPhotoCaption: this.state.currentListing[`photo${this.state.currentPhotoIndexInListing}_caption`],
      })
    }
    if (photoNumber > 1 && photoNumber + 3 <= max) {
      this.setState({
        nextPrevImages: [this.state.currentListing[`photo${photoNumber}_b`], this.state.currentListing[`photo${photoNumber + 1}_b`], this.state.currentListing[`photo${photoNumber + 2}_b`], this.state.currentListing[`photo${photoNumber + 3}_b`]],
        nextPrevBorders: ['none', '2px solid #404040', 'none', 'none'],
        nextPrevOpacities: ['70%', '100%', '70%', '70%']
      })
    } else {
      this.setState((prevState) => {
        return {
          nextPrevBorders: ['none', 'none', 'none', 'none'].map((x, i) => {
            if (i === prevState.nextPrevBorders.indexOf('2px solid #404040') + 1 || (prevState.nextPrevBorders.indexOf('2px solid #404040') === 3 && i === 3)) {
              return '2px solid #404040';
            } else {
              return x;
            }
          }),
          nextPrevOpacities: ['70%', '70%', '70%', '70%'].map((x, i) => {
            if (i === prevState.nextPrevOpacities.indexOf('100%') + 1 || (prevState.nextPrevOpacities.indexOf('100%') === 3 && i === 3)) {
              return '100%';
            } else {
              return x;
            }
          })
        }
      })
    }
  };

  handlePhotoClick(e) {
    e.preventDefault();
    let url = e.target.src;
    let id = Number(e.target.id.split('').pop());
    if (id < 5) {
      this.setState({
        overlay: true,
        currentPhotoUrl: url,
        currentPhotoIndexInListing: id,
        currentPhotoCaption: this.state.currentListing[`photo${id}_caption`],
        nextPrevBorders: ['none', 'none', 'none', 'none'].map((x, i) => {
          if (i === (id - 1)) {
            return '2px solid #404040';
          } else {
            return x;
          }
        }),
        nextPrevOpacities: ['70%', '70%', '70%', '70%'].map((x, i) => {
          if (i === (id - 1)) {
            return '100%';
          } else {
            return x;
          }
        })
      });
    } else if (id === 5) {
      this.setState({
        nextPrevImages: [this.state.currentListing.photo2_b, this.state.currentListing.photo3_b, this.state.currentListing.photo4_b, this.state.currentListing.photo5_b],
        overlay: true,
        currentPhotoUrl: url,
        currentPhotoIndexInListing: id,
        currentPhotoCaption: this.state.currentListing[`photo${id}_caption`],
        nextPrevBorders: ['none', 'none', 'none', '2px solid #404040'],
        nextPrevOpacities: ['70%', '70%', '70%', '100%']
      });
    }
  };

  render() {
    if (!this.state.overlay) {
      return (
        <div id="photoGalleryService">
          <PhotoGallery state={this.state} handleViewPhotos={this.handleViewPhotos.bind(this)} handlePhotoClick={this.handlePhotoClick.bind(this)}/>
        </div>
      )
    } else {
      return (
        <div id="photoGalleryService">
          <Carousel state={this.state} handleExit={this.handleExit.bind(this)} handleNextPrevClick={this.handleNextPrevClick.bind(this)} handleLeftClick={this.handleLeftClick.bind(this)} handleRightClick={this.handleRightClick.bind(this)}/>
        </div>
      )
    }
  };
};

export default PhotoService;