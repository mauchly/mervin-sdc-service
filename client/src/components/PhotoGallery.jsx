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
      shareBottom: '610px',
      shareRight: '131px',
      saveBottom: '610px',
      saveLeft: '1308px',
      photoOpacities: ['1-index-array', '100%', '100%', '100%', '100%', '100%']
    };

    this.currentFaded = [];

  }

  handleSaved(e) {
    e.preventDefault();
    let data = {listingId: this.props.state.currentListing.listing_id};
    $.ajax({
      method: 'POST',
      url: 'http://ec2-54-183-138-229.us-west-1.compute.amazonaws.com:3002/favorite',
      data: data,
      success: (result) => {
        console.log('successful fav save', result);
      },
      error: (err) => {
        console.log('error', err);
      }
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
        shareRight: '141px',
        saveLeft: '1297px'
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
        shareRight: '131px',
        saveLeft: '1308px'
      });
    }
  };

  handleShare(e) {
    e.preventDefault();
    alert('Listing Shared!');
  };

  handleMouseEnter(e) {
    let id = e.target.id.split('').pop();
    this.setState((prevState) => ({
      photoOpacities: prevState.photoOpacities.map((x, i) => {
        if (i === 0 || i === Number(id)) {
          return x;
        } else {
          return '0.7';
        }
      })
    }));
  };

  handleMouseLeave(e) {
    this.setState({
      photoOpacities: ['1-index-array', '100%', '100%', '100%', '100%', '100%']
    });
  };

  render() {
    return (
      <div>
        <div className="photoContainer" style={{overflow: 'hidden', height:'440px', width:'49.89%', border: '1px solid #454545', backgroundColor:'#454545', float:'left', position: 'initial'}}>
          <img src={`${this.props.state.currentListing.photo1_a}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className="innerPhoto" id="photo1" onClick={this.props.handlePhotoClick} style={{opacity: `${this.state.photoOpacities[1]}`, height:'109%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
        </div>
        <div className="photoContainer" style={{overflow: 'hidden', height:'219px', width:'24.8%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
          <img src={`${this.props.state.currentListing.photo2_b}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className="innerPhoto" id="photo2" onClick={this.props.handlePhotoClick} style={{opacity: `${this.state.photoOpacities[2]}`, height:'109.5%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
        </div>
        <div className="photoContainer" style={{overflow: 'hidden', height:'219px', width:'24.87%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
          <img src={`${this.props.state.currentListing.photo4_b}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className="innerPhoto" id="photo4" onClick={this.props.handlePhotoClick} style={{opacity: `${this.state.photoOpacities[4]}`, backgroundImage:`url(${this.props.state.currentListing.photo4_b})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', height:'110%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
          <input className="photoGalButton" type="button" value="Share" onClick={this.handleShare.bind(this)} style={{position: 'absolute', bottom: `${this.state.shareBottom}`, right: `${this.state.shareRight}`, overflow: 'hidden', backgroundImage:'url(https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/share_icon.png)', backgroundRepeat:'no-repeat', backgroundSize:'26px', backgroundPosition:'10px 5px', height:'36px', width:'96px', border:'none', borderRadius:'4px', margin:`${this.state.shareButtonMargin}`}}></input>
          <input className="photoGalButton" id="Save" type="button" value={`${this.state.saveButtonValue}`} onClick={this.handleSaved.bind(this)} style={{position: 'absolute', bottom: `${this.state.saveBottom}`, left: `${this.state.saveLeft}`, overflow: 'hidden', backgroundImage:`url(${this.state.heartPhoto})`, backgroundRepeat:'no-repeat', backgroundSize:`${this.state.heartSize}`, backgroundPosition:`${this.state.heartPosition}`, height:`${this.state.saveButtonHeight}`, width:`${this.state.saveButtonWidth}`, border:'none', borderRadius:'4px', margin:`${this.state.saveButtonMargin}`}}></input>
        </div>
        <div className="photoContainer" style={{overflow: 'hidden', height:'219px', width:'24.8%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
          <img src={`${this.props.state.currentListing.photo3_b}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className="innerPhoto" id="photo3" onClick={this.props.handlePhotoClick} style={{opacity: `${this.state.photoOpacities[3]}`, height:'109.5%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
        </div>
        <div className="photoContainer" style={{overflow: 'hidden', height:'219px', width:'24.87%', border: '1px solid #454545', float:'left'}}>
          <img src={`${this.props.state.currentListing.photo5_b}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className="innerPhoto" id="photo5" onClick={this.props.handlePhotoClick} style={{opacity: `${this.state.photoOpacities[5]}`, height:'110%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
            <input className="photoGalButton" id="viewPhotos" type="button" value="View Photos" onClick={this.props.handleViewPhotos} style={{position: 'absolute', left: '1080px', top: '302px', height:'36px', width:'114px', border:'none', borderRadius:'4px', margin:'161px 0 0 222px'}}></input>

        </div>
      </div>
    )
  }
}

export default PhotoGallery;