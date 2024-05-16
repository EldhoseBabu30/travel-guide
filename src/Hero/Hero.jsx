import React from 'react';
import './Hero.css';
import hero from '../assets/hero.jpeg'; // Import the image file

const Hero = () => {
  return (
    <div className='container'>
       
      <div className='hero-img'>
        <img
       
          src={hero} 
          alt='Hero Image'
        />
      </div>        
    </div>
  );
};

export default Hero;
