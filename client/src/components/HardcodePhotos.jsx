import React from 'react';

class HardcodePhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <img id="hardcodePhoto1" src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/listingTitleHardcoded.png"/>
        <img id="hardcodePhoto2" src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/listingTitleHardcoded2.png"/>
        <img id="hardcodePhoto3" src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/listingTitleHardcoded3.png"/>
      </div>
    )
  }
}

export default HardcodePhotos;