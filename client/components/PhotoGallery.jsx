import React from 'react';
import $ from 'jquery';
import {photostyle, save, saved} from '../styles/styles.js'


class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: false,
    };
  }

  handleSaved(e) {
    e.preventDefault();
    let data = {listingId: this.props.state.currentListing.listing_id};
    $.ajax({
      method: 'POST',
      url: 'http://ec2-54-183-138-229.us-west-1.compute.amazonaws.com:3002/favorite',
      data: data,
      success: (result) => {console.log('successful fav save', result)},
      error: (err) => {console.log(err)}
    });
  };

  handleShare(e) {
    e.preventDefault();
    alert('Listing Shared!');
  };

  heartRender() {
    if (!this.state.heart) {
      return (
        <button className="photoGalButton" id="Save" style={save} onClick={this.handleSaved.bind(this)}>
          <img className="heart-save" src='https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/favorite_heart.png'/>
          Save
        </button>
      )
    } else {
      return (
        <button className="photoGalButton" id="Saved" onClick={this.handleSaved.bind(this)}>
          <img className="heart-saved" src='https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/favorite_heart_true.png'/>
          Saved
        </button>
      )
    }
  }

  shareRender() {
    return (
      <button className="photoGalButton" id="Share" onClick={this.handleShare.bind(this)}>
        <img className="share-icon" src='https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/share_icon.png'/>
        Share
      </button>
    )
  }
  photosRender() {
    return (
      <button className="photoGalButton" id="viewPhotos" onClick={this.props.handleViewPhotos}>
        View Photos
      </button>
    )
  }

  render() {
    return (
      <div className="photoWrapper">
        <div className="photoContainer initial" style={{overflow: 'hidden', height:'440px', width:'49.89%', border: '1px solid #454545', backgroundColor:'#454545', float:'left', position: 'initial'}}>
          <img src={this.props.state.currentListing.photo1_a} className="innerPhoto" id="photo1" onClick={this.props.handlePhotoClick} style={{height:'109%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
        </div>
        <div className="photoContainer" style={photostyle}>
          <img src={this.props.state.currentListing.photo2_b} className="innerPhoto" id="photo2" onClick={this.props.handlePhotoClick} style={{height:'109.5%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
        </div>
        <div className="photoContainer" style={photostyle}>
          <img src={this.props.state.currentListing.photo4_b} className="innerPhoto" id="photo4" onClick={this.props.handlePhotoClick} style={{ backgroundSize:'cover', backgroundRepeat:'no-repeat', height:'110%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
          {this.shareRender()}
          {this.heartRender()}
        </div>
        <div className="photoContainer" style={photostyle}>
          <img src={this.props.state.currentListing.photo3_b} className="innerPhoto" id="photo3" onClick={this.props.handlePhotoClick} style={{height:'109.5%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
        </div>
        <div className="photoContainer" style={photostyle}>
          <img src={this.props.state.currentListing.photo5_b} className="innerPhoto" id="photo5" onClick={this.props.handlePhotoClick} style={{height:'110%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
          {this.photosRender()}
        </div>
      </div>
    )
  }
}

export default PhotoGallery;

