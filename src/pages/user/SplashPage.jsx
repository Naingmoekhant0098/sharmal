import React from 'react';
import './SplashPage.css';
import logo from '../../assets/icons/preloaderLogo.png';

const SplashPage = ({ loading }) => {
  return (
    <div className="splash-container">
      <div className="splash-content">
      <div style={{position :"relative"}}>
        <div className='overlay1' style={ { width : '100%' , height :'100%' , background :'rgba(255, 255, 255, 0.4)' ,  backdropFilter  : "blur(1px)" , position : 'absolute' , top:0 , zIndex :10 }}></div>
      <img src={logo} alt="Sharmal..." className="splash-logo" />
      </div>
        <div className={`loading-text ${loading >= 100 ? '' : ''}`}>
          {loading}%
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
