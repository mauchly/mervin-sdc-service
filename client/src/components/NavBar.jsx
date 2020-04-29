import React from 'react';

const NavBar = (props) => {
  return (
    <div style={{padding:'8px 0 2px 20px'}}>
      <img src='https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/airbnblogo.jpg' alt='airbnb logo' style={{width:'40.27px', height:'44.7px', float:'left', padding:'2.4px 0 0 1.225px'}}/>
      <form style={{padding:'0 0 0 20px', float:'left'}}>
      <input id="navBarSearchBar" onKeyPress={props.handleSearchBar} placeholder ='Search' style={{marginLeft:'-1px', padding:'18px 288px 15px 45px', borderRadius:'4px', border:'1px solid #EBEBEB', boxShadow:'0.5px 2px 5px rgb(0, 0, 0, 8%)', backgroundImage: 'url(https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/searchlogo.jpg)', backgroundSize: '28px', backgroundPosition:'12px 11px', backgroundRepeat:'no-repeat'}}/>
      </form>
      <div>
        <p id="navBarLinks" style={{padding:'1.5px 10px 15px 904px', letterSpacing:'0.035em', fontWeight:'500', fontFamily:'arial, sans-serif', fontSize:'14px'}}>Add listing⠀⠀⠀Host⠀⠀⠀Saved⠀⠀⠀ Trips⠀⠀⠀Messages⠀⠀ ⠀Help</p>
        <img src='https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/airbnbprofilepic.jpg' alt='airbnb logo' style={{width:'40.25px', height:'470%', float:'right', margin:'-61px 18px 0 0', height:'2.6em'}}/>
      </div>
    </div>
  )
}

export default NavBar;