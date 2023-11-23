import React from 'react'
import "./SwipeButtons.css"
import ReplayIcon from"@material-ui/icons/Replay"
import CloseIcon from"@material-ui/icons/Close"
import StarRateIcon from"@material-ui/icons/StarRate"
import FavoriteIcon from"@material-ui/icons/Favorite"
import FlashOnIcon from"@material-ui/icons/FlashOn"
import IconButton from"@material-ui/core/IconButton"
import welcome from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css'
function SwipeButtons() {
  return (
    <div className="swipeButtons">
      <IconButton  className="swipeButtons_repeat">
        <ReplayIcon fontSize="large" />
      </IconButton>
      <IconButton  className="swipeButtons_star">
        <StarRateIcon fontSize="large" />
      </IconButton>
      <IconButton  className="swipeButtons_right">
        <FavoriteIcon fontSize="large" />
      </IconButton>
      <IconButton  className="swipeButtons_lighting">
        <FlashOnIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default SwipeButtons;

//Swiper Module in Progress
//<Swiper ref='swiper' style={welcome.wrapper} showsButtons={false} loop={false} >
//<IconButton  className="swipeButtons_left" onPress={() => this.refs.swiper.scrollBy(1)}>
 // <CloseIcon fontSize="large" />
//</IconButton>
//</Swiper>