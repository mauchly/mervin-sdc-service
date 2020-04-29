import React from 'react';
import $ from 'jquery';
import NavBar from './components/NavBar.jsx';
import PhotoGallery from './components/PhotoGallery.jsx';
import Carousel from './components/Carousel.jsx';
import Empty from './components/Empty.jsx';
import HardcodePhotos from './components/HardcodePhotos.jsx';

let listingNames = ["one_index_listing_names", "Super_Cute_Retro_Airstream", "Redundant_Driver_Strategic_house", "Multibyte_Program_Opensource_house", "Neural_Transmitter_Magnetic_house", "Haptic_Bandwidth_Leadingedge_house", "Primary_Harddrive_Killer_house", "Solidstate_Harddrive_Crossplatform_house", "Optical_Bandwidth_Robust_house", "Solidstate_Interface_Crossmedia_house", "Bluetooth_Port_Opensource_house", "Neural_Program_Bricksandclicks_house", "Online_Matrix_Usercentric_house", "Virtual_Transmitter_Interactive_house", "Virtual_System_Cuttingedge_house", "Bluetooth_Application_Robust_house", "Primary_Harddrive_B2C_house", "Haptic_Port_Transparent_house", "Haptic_Bus_Sexy_house", "Auxiliary_Feed_Cuttingedge_house", "Optical_Firewall_Clicksandmortar_house", "Auxiliary_Feed_Impactful_house", "Neural_Circuit_Outofthebox_house", "Bluetooth_Port_Compelling_house", "Bluetooth_Transmitter_Granular_house", "Optical_Bandwidth_Efficient_house", "Haptic_Port_Onetoone_house", "Online_Program_Intuitive_house", "Haptic_Protocol_Frontend_house", "Solidstate_Port_Valueadded_house", "Multibyte_Bandwidth_Proactive_house", "Opensource_Driver_Granular_house", "Wireless_Panel_Realtime_house", "Mobile_Port_Innovative_house", "Neural_Alarm_Bricksandclicks_house", "Digital_Feed_Revolutionary_house", "Auxiliary_System_Innovative_house", "1080p_Circuit_Scalable_house", "Auxiliary_Alarm_Onetoone_house", "Haptic_System_Worldclass_house", "1080p_Microchip_Ubiquitous_house", "Multibyte_System_Interactive_house", "Haptic_Firewall_Ebusiness_house", "Virtual_Feed_Proactive_house", "1080p_Bus_Viral_house", "Wireless_Matrix_Frictionless_house", "Bluetooth_Application_Revolutionary_house", "1080p_Application_Bricksandclicks_house", "Backend_Bus_24/365_house", "Mobile_Alarm_Granular_house", "Backend_Alarm_Bestofbreed_house", "Wireless_Panel_Clicksandmortar_house", "Crossplatform_Harddrive_Wireless_house", "Solidstate_Alarm_Robust_house", "Neural_Application_Intuitive_house", "Multibyte_Interface_Interactive_house", "Backend_System_Rich_house", "Backend_Feed_Usercentric_house", "Bluetooth_System_Realtime_house", "Multibyte_Alarm_24/7_house", "Mobile_Alarm_Dotcom_house", "Multibyte_Sensor_Opensource_house", "Auxiliary_Sensor_Endtoend_house", "Solidstate_Card_Cuttingedge_house", "Wireless_Interface_Interactive_house", "Auxiliary_Panel_Vertical_house", "Multibyte_Program_Wireless_house", "Crossplatform_Microchip_Synergistic_house", "Bluetooth_Matrix_Magnetic_house", "Mobile_Sensor_Missioncritical_house", "Virtual_Port_Bleedingedge_house", "Auxiliary_Bus_Bestofbreed_house", "Haptic_Alarm_B2B_house", "1080p_Array_Plugandplay_house", "Optical_Microchip_Revolutionary_house", "Digital_Card_B2C_house", "Bluetooth_Microchip_Webenabled_house", "1080p_Matrix_Impactful_house", "Neural_Feed_Enterprise_house", "Crossplatform_Matrix_Visionary_house", "Optical_Card_Proactive_house", "Redundant_Alarm_Plugandplay_house", "Redundant_Alarm_Seamless_house", "Wireless_Application_Endtoend_house", "Virtual_Panel_Scalable_house", "1080p_System_Visionary_house", "Solidstate_Bandwidth_Nextgeneration_house", "Crossplatform_System_Endtoend_house", "Wireless_Driver_Rich_house", "Backend_Matrix_Robust_house", "Opensource_Bandwidth_B2B_house", "Mobile_Pixel_Proactive_house", "Backend_Harddrive_Frictionless_house", "Auxiliary_Array_Ubiquitous_house", "Mobile_Pixel_Frictionless_house", "Online_Transmitter_Dotcom_house", "Bluetooth_Sensor_Revolutionary_house", "Crossplatform_Protocol_Granular_house", "Primary_Matrix_Realtime_house", "Crossplatform_Port_Wireless_house", "Online_Bus_Integrated_house"];

class PhotoService extends React.Component {
  constructor() {
    super()
    this.state = {
      navBar: NavBar,
      photoGallery: PhotoGallery,
      carousel: Empty,
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
    }
  };

  handleViewPhotos (e) {
    e.preventDefault;
    this.setState({
      carousel: Carousel,
      nextPrevBorders: ['2px solid #404040', 'none', 'none', 'none'],
      nextPrevOpacities: ['100%', '70%', '70%', '70%']
    });
  };

  dupGetNumOfListingPhotos(listing) {
    let dupPhotosArray = Object.keys(listing).slice(4, -3);
    let dupListingSmallUrls = [];
    let count = 0;
    for (let key of dupPhotosArray) {
      if (listing[key]) {
        if (key.split('').slice(-1) == 'b') {
          dupListingSmallUrls.push(listing[key])
        }
        count++
      }
    }
    return Math.ceil(count / 3);
  };

  componentDidMount() {
    let url = window.location.href;
    let id = url.split('/').pop();
    if (isNaN(Number(id))) {
      if (listingNames.indexOf(id) === -1) {
        id = listingNames[1];
      }
    } else {
      if (id < 10001 || id > 10100) {
        id = 10001;
      }
    }
    let data = {listingId: id};
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3002/listing-info',
        data,
        dataType: 'text',
        success: (result) => {
          result = JSON.parse(result);
          console.log('result in client', result);
          let numOfPhotos = this.dupGetNumOfListingPhotos(result[0]);
          this.setState(() => ({
            currentListing: result[0],
            currentPhotoUrl: result[0].photo1_a,
            nextPrevImages: [result[0].photo1_b, result[0].photo2_b, result[0].photo3_b, result[0].photo4_b],
            numOfCurrentListingPhotos: numOfPhotos,
            currentPhotoCaption: result[0].photo1_caption
          }));
        },
        error: (err) => {
          console.log('error', err);
        }
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
      console.log('default prevented');
    }
  };

  handleExit(e) {
    e.preventDefault();
    this.setState({
      carousel: Empty,
      photoGallery: PhotoGallery,
      currentPhotoUrl: this.state.currentListing.photo1_a,
      currentPhotoCaption: this.state.currentListing.photo1_caption,
      currentPhotoIndexInListing: 1,
      nextPrevImages: [this.state.currentListing.photo1_b, this.state.currentListing.photo2_b, this.state.currentListing.photo3_b, this.state.currentListing.photo4_b]
    });
  };

  handleLeftClick(e) {
    e.preventDefault();
    console.log('HERE', $('#prevAndNextImagesContainer')[0].children[0].style.cssText);
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
    console.log('ID', e.target.id)
    console.log('before photo Url', this.state.currentPhotoUrl);
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
    console.log('url', url);
    console.log('id', id)
    if (id < 5) {
      this.setState({
        carousel: Carousel,
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
        carousel: Carousel,
        currentPhotoUrl: url,
        currentPhotoIndexInListing: id,
        currentPhotoCaption: this.state.currentListing[`photo${id}_caption`],
        nextPrevBorders: ['none', 'none', 'none', '2px solid #404040'],
        nextPrevOpacities: ['70%', '70%', '70%', '100%']
      });
    }
  };

  render() {
    return (
      <div id="photoGalleryService">
        <this.state.navBar handleSearchBar={this.handleSearchBar.bind(this)}/>
        <this.state.photoGallery state={this.state} handleViewPhotos={this.handleViewPhotos.bind(this)} handlePhotoClick={this.handlePhotoClick.bind(this)}/>
        <this.state.carousel state={this.state} handleExit={this.handleExit.bind(this)} handleNextPrevClick={this.handleNextPrevClick.bind(this)} handleLeftClick={this.handleLeftClick.bind(this)} handleRightClick={this.handleRightClick.bind(this)}/>
        <HardcodePhotos/>
      </div>
    )
  };
};

export default PhotoService;