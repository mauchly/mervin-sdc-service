import React from 'react';
import $ from 'jquery';

class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.heartPhotos = ['https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/favorite_heart.png', 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/favorite_heart_true.png'];
    this.state = {
      heart: false,
      heartPhoto: this.heartPhotos[0],
      saveButtonValue: 'Save',
      saveButtonMargin: '23px 0 0 18.7px',
      saveButtonWidth: '90px',
      saveButtonHeight: '36px',
      heartSize: '24px',
      heartPosition: '10px 6px',
      shareButtonMargin: '23px 0 0 130px',
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
    if (!this.state.heart) {
      this.setState({
        heart: !this.state.heart,
        heartPhoto: this.heartPhotos[1],
        saveButtonValue: 'Saved',
        saveButtonMargin: '23px 0 0 18.7px',
        saveButtonWidth: '100px',
        saveButtonHeight: '38px',
        heartSize: '22.5px',
        heartPosition: '11.5px 6px',
        shareButtonMargin: '23px 0 0 121px',
        saveButtonMargin: '22.5px 0 0 18.5px',

      });
    } else {
      this.setState({
        heart: !this.state.heart,
        heartPhoto: this.heartPhotos[0],
        saveButtonValue: 'Save',
        saveButtonMargin: '23px 0 0 18.7px',
        saveButtonWidth: '90px',
        saveButtonHeight: '36px',
        heartSize: '24px',
        heartPosition: '8px 4.8px',
        shareButtonMargin: '23px 0 0 130px',

      });
    }
  };

  handleShare(e) {
    e.preventDefault();
    alert('Listing Shared!');
  };

  render() {
    return (
      <div className="photoWrapper">
        <div className="photoContainer" style={{overflow: 'hidden', height:'440px', width:'49.89%', border: '1px solid #454545', backgroundColor:'#454545', float:'left', position: 'initial'}}>
          <img src={`${this.props.state.currentListing.photo1_a}`} className="innerPhoto" id="photo1" onClick={this.props.handlePhotoClick} style={{height:'109%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
        </div>
        <div className="photoContainer" style={{overflow: 'hidden', height:'219px', width:'24.8%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
          <img src={`${this.props.state.currentListing.photo2_b}`} className="innerPhoto" id="photo2" onClick={this.props.handlePhotoClick} style={{height:'109.5%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
        </div>
        <div className="photoContainer" style={{position: 'relative', overflow: 'hidden', height:'219px', width:'24.87%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
          <img src={`${this.props.state.currentListing.photo4_b}`} className="innerPhoto" id="photo4" onClick={this.props.handlePhotoClick} style={{backgroundImage:`url(${this.props.state.currentListing.photo4_b})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', height:'110%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
          <input className="photoGalButton" type="button" value="Share" onClick={this.handleShare.bind(this)}
            style={{zIndex: '10', position: 'absolute', top: '24px', right: '136px', overflow: 'hidden', backgroundImage:'url(https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/share_icon.png)', backgroundRepeat:'no-repeat', backgroundSize:'26px', backgroundPosition:'10px 5px', height:'36px', width:'96px', border:'none', borderRadius:'4px', margin:`${this.state.shareButtonMargin}`}}>
          </input>
          <input className="photoGalButton" id="Save" type="button" value={`${this.state.saveButtonValue}`} onClick={this.handleSaved.bind(this)}
            style={{zIndex: '10', position: 'absolute', top: '24px', right: '24px', overflow: 'hidden', backgroundImage:`url(${this.state.heartPhoto})`, backgroundRepeat:'no-repeat', backgroundSize:`${this.state.heartSize}`, backgroundPosition:`${this.state.heartPosition}`, height:`${this.state.saveButtonHeight}`, width:`${this.state.saveButtonWidth}`, border:'none', borderRadius:'4px', margin:`${this.state.saveButtonMargin}`}}>
          </input>
        </div>
        <div className="photoContainer" style={{overflow: 'hidden', height:'219px', width:'24.8%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
          <img src={`${this.props.state.currentListing.photo3_b}`} className="innerPhoto" id="photo3" onClick={this.props.handlePhotoClick} style={{height:'109.5%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
        </div>
        <div className="photoContainer" style={{position: 'relative', overflow: 'hidden', height:'219px', width:'24.87%', border: '1px solid #454545', float:'left'}}>
          <img src={`${this.props.state.currentListing.photo5_b}`} className="innerPhoto" id="photo5" onClick={this.props.handlePhotoClick} style={{height:'110%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
          <input className="photoGalButton" id="viewPhotos" type="button" value="View Photos" onClick={this.props.handleViewPhotos}
            style={{position: 'absolute', bottom: '24px', right: '24px', height:'36px', width:'114px', border:'none', borderRadius:'4px'}}>
          </input>
        </div>
      </div>
    )
  }
}

export default PhotoGallery;

