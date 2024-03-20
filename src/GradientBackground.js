import React from 'react';
import circle1 from './SVG/circle1.svg';
import circle2 from './SVG/circle2.svg';
import circle3 from './SVG/circle3.svg';
import circle4 from './SVG/circle4.svg';
import noise from './SVG/Noise.svg';

const GradientBackground = ({ circleImages }) => {
  return (
    <div className="background">
        <div className="gradient-background">

            <img src={circle1} id="circle1"/>
            <img src={circle2} id="circle2"/>
            <img src={circle3} id="circle3"/>
            <img src={circle4} id="circle4"/>
        </div>
        <img src={noise} id="noise"/>
    </div>
  );
};

export default GradientBackground;