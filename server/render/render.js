const template = (listing) => {
  return `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <title>fec Photo Gallery</title>
              <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
              <link rel="stylesheet" type="text/css" href="https://mervin-sdc-service.s3-us-west-1.amazonaws.com/style.css"/>


            </head>
            <body>
              <div id="PhotoService">
                <div id="photoGalleryService">
                  <div style="padding: 8px 0 2px 20px">
                    <img class="airbnb-logo" src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/airbnblogo.jpg" alt="airbnb logo"/>
                    <form class="search-form">
                    <input id="navBarSearchBar" onKeyPress={props.handleSearchBar} placeholder ="Search"/>
                    </form>
                    <div>
                      <p id="navBarLinks">Add listing⠀⠀⠀Host⠀⠀⠀Saved⠀⠀⠀ Trips⠀⠀⠀Messages⠀⠀ ⠀Help</p>
                      <img class="airbnb-user-logo" src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/airbnbprofilepic.jpg" alt="airbnb logo"/>
                    </div>
                  </div>
                </div>

                ${photo(listing)}



              </div>




            </body>
          </html>`
}


// const photo = (listing) => {
//   return `<div>
//             <div className="photoContainer" style={{overflow: 'hidden', height:'440px', width:'49.89%', border: '1px solid #454545', backgroundColor:'#454545', float:'left', position: 'initial'}}>
//               <img src={`${this.props.state.currentListing.photo1_a}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className="innerPhoto" id="photo1" onClick={this.props.handlePhotoClick} style={{opacity: `${this.state.photoOpacities[1]}`, height:'109%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
//             </div>
//             <div className="photoContainer" style={{overflow: 'hidden', height:'219px', width:'24.8%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
//               <img src={`${this.props.state.currentListing.photo2_b}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className="innerPhoto" id="photo2" onClick={this.props.handlePhotoClick} style={{opacity: `${this.state.photoOpacities[2]}`, height:'109.5%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
//             </div>
//             <div className="photoContainer" style={{overflow: 'hidden', height:'219px', width:'24.87%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
//               <img src={`${this.props.state.currentListing.photo4_b}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className="innerPhoto" id="photo4" onClick={this.props.handlePhotoClick} style={{opacity: `${this.state.photoOpacities[4]}`, backgroundImage:`url(${this.props.state.currentListing.photo4_b})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', height:'110%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
//               <input className="photoGalButton" type="button" value="Share" onClick={this.handleShare.bind(this)} style={{position: 'absolute', bottom: `${this.state.shareBottom}`, right: `${this.state.shareRight}`, overflow: 'hidden', backgroundImage:'url(https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/share_icon.png)', backgroundRepeat:'no-repeat', backgroundSize:'26px', backgroundPosition:'10px 5px', height:'36px', width:'96px', border:'none', borderRadius:'4px', margin:`${this.state.shareButtonMargin}`}}></input>
//               <input className="photoGalButton" id="Save" type="button" value={`${this.state.saveButtonValue}`} onClick={this.handleSaved.bind(this)} style={{position: 'absolute', bottom: `${this.state.saveBottom}`, left: `${this.state.saveLeft}`, overflow: 'hidden', backgroundImage:`url(${this.state.heartPhoto})`, backgroundRepeat:'no-repeat', backgroundSize:`${this.state.heartSize}`, backgroundPosition:`${this.state.heartPosition}`, height:`${this.state.saveButtonHeight}`, width:`${this.state.saveButtonWidth}`, border:'none', borderRadius:'4px', margin:`${this.state.saveButtonMargin}`}}></input>
//             </div>
//             <div className="photoContainer" style={{overflow: 'hidden', height:'219px', width:'24.8%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
//               <img src={`${this.props.state.currentListing.photo3_b}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className="innerPhoto" id="photo3" onClick={this.props.handlePhotoClick} style={{opacity: `${this.state.photoOpacities[3]}`, height:'109.5%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
//             </div>
//             <div className="photoContainer" style={{overflow: 'hidden', height:'219px', width:'24.87%', border: '1px solid #454545', float:'left'}}>
//               <img src={`${this.props.state.currentListing.photo5_b}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} className="innerPhoto" id="photo5" onClick={this.props.handlePhotoClick} style={{opacity: `${this.state.photoOpacities[5]}`, height:'110%', width:'100%', backgroundColor:'#454545', float:'left'}}/>
//               <input className="photoGalButton" id="viewPhotos" type="button" value="View Photos" onClick={this.props.handleViewPhotos} style={{position: 'absolute', left: '1080px', top: '302px', height:'36px', width:'114px', border:'none', borderRadius:'4px', margin:'161px 0 0 222px'}}></input>
//             </div>
//           </div>`
// }


const photo = (listing) => {
  console.log(listing)
  return `<div>
            <div class="photoContainer-first">
              <img src=${listing[0].l_photo} class="innerPhoto" id="photo1"/>
            </div>
            <div class="photoContainer">
              <img src=${listing[2].s_photo} class="innerPhoto" id="photo2"/>
            </div>
            <div class="photoContainer">
              <img src=${listing[3].s_photo} class="innerPhoto" id="photo3"/>
              <input class="photoGalButton" type="button" value="Share"></input>
              <input class="photoGalButton" id="Save" type="button"></input>
            </div>
            <div class="photoContainer">
              <img src=${listing[4].s_photo} class="innerPhoto" id="photo4" />
            </div>
            <div class="photoContainer" >
              <img src=${listing[5].s_photo} class="innerPhoto" id="photo5" />
              <input class="photoGalButton" id="viewPhotos" type="button" value="View Photos" ></input>
            </div>
          </div>`

}




// https://mervin-sdc-service.s3-us-west-1.amazonaws.com/style.css

module.exports = {
  template
}