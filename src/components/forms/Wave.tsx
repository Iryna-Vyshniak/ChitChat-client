import React from "react";

import { WaveProps } from "../../shared/types";

const Wave: React.FC<WaveProps> = ({ style, flipHorizontal, flipVertical }) => {
    const defaultStyle: React.CSSProperties = {
        marginBottom: flipHorizontal && flipVertical ? '0' : '-0.5rem',
        transform: `
          ${flipHorizontal ? 'scaleX(-1)' : ''}
          ${flipVertical ? 'scaleY(-1)' : ''}
        `,
      };
    
    return (
    <svg
      style={{ ...defaultStyle, ...style}}
      width="1440.000000"
      height="320.000000"
      viewBox="0 0 1440 320" 
      fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs/>
    <path id="Vector 2" d="M400.2 45L404 230L279.31 293.77C264.38 301.41 246.63 301.05 232.02 292.83L156.35 250.25C140.23 241.17 120.41 241.74 104.83 251.74L0 319L0 45L400.2 45Z" fill="var(--ion-color-intro-violet)" />
    <path id="Vector 2" d="M400.2 45L0 45L0 319L104.83 251.74C120.41 241.74 140.23 241.17 156.35 250.25L232.02 292.83C246.63 301.05 264.38 301.41 279.31 293.77L404 230L400.2 45Z" stroke="#ffffff"  strokeOpacity="0" strokeWidth="1.000000"/>
    <path id="Vector 3" d="M396.24 0L400 185L276.97 248.55C261.94 256.31 244.01 255.95 229.31 247.6L155.26 205.51C139.04 196.28 119.03 196.86 103.36 207.01L0 274L0 0L396.24 0Z" fill="var(--ion-color-secondary)" fillOpacity="0.700000" fillRule="nonzero"/>
    <path id="Vector 3" d="M396.24 0L0 0L0 274L103.36 207.01C119.03 196.86 139.04 196.28 155.26 205.51L229.31 247.6C244.01 255.95 261.94 256.31 276.97 248.55L400 185L396.24 0Z" stroke="#ffffff"  strokeOpacity="0" strokeWidth="1.000000"/>
    </svg>
  
    );
  };
  
  export default Wave;