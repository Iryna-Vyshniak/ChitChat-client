import React from "react";

import { WaveProps } from "../../shared/types";

const Wave: React.FC<WaveProps> = ({ style, flipHorizontal, flipVertical }) => {
    const defaultStyle: React.CSSProperties = {
        marginBottom: flipHorizontal && flipVertical ? '0' : '-0.5rem',
        position: flipHorizontal && flipVertical ? 'static' : 'absolute',
        top: flipHorizontal && flipVertical ? '0' : '-5%',
        zIndex: flipHorizontal && flipVertical ? '0' : '2',
        
        transform: `
          ${flipHorizontal ? 'scaleX(-1)' : ''},
          ${flipVertical ? 'scaleY(-1)' : ''}
        `,
      };
    
    return (
    <svg
      style={{ ...defaultStyle, ...style}}
     width="1995.000000" height="411.000000" viewBox="0 0 1995 411"
      fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs/>
    <path id="Vector 1" d="M1990.32 281.57L1886.43 12.53L0 12.53L0 411L604.36 291.37C610.38 290.18 616.57 290.1 622.62 291.16L1195.77 390.67C1201.18 391.61 1206.69 391.65 1212.12 390.8L1990.32 281.57Z" fill="var(--ion-color-intro-violet)" fill-opacity="0.800000" fill-rule="evenodd"/>
	<path id="Vector 1" d="M1886.43 12.53L0 12.53L0 411L604.36 291.37C610.38 290.18 616.57 290.1 622.62 291.16L1195.77 390.67C1201.18 391.61 1206.69 391.65 1212.12 390.8L1990.32 281.57L1886.43 12.53Z" stroke="#000000" stroke-opacity="0" stroke-width="1.000000"/>
	<path id="Vector 2" d="M1980.8 231.97L1980.8 11.84L0 11.84L0 348.3L640.89 233.45C646.37 232.47 651.98 232.41 657.48 233.27L1266.26 328.97C1271.4 329.78 1276.62 329.78 1281.76 328.98L1980.8 231.97Z" fill="var(--ion-color-secondary)" fill-opacity="0.700000" fill-rule="evenodd"/>
	<path id="Vector 2" d="M1980.8 11.84L0 11.84L0 348.3L640.89 233.45C646.37 232.47 651.98 232.41 657.48 233.27L1266.26 328.97C1271.4 329.78 1276.62 329.78 1281.76 328.98L1980.8 231.97L1980.8 11.84Z" stroke="#000000" stroke-opacity="0" stroke-width="1.000000"/>
    </svg>
  
    );
  };
  
  export default Wave;