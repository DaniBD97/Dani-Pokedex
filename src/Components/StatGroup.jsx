import React from 'react';

export const StatGroup = ({ statName, statValue }) => {
  const maxValue = 100;
  const percentage = (statValue / maxValue) * 10;

  const barStyle = {
    height: '100px',
    background: `linear-gradient(0deg, #007aff ${percentage}%, #fff ${percentage}%)`,
    width: '30px',
    border: '2px solid black'
    
  };

  return (
    <div className='stat-group h-[300px] flex flex-col  items-center'>
      <span className='counter-stat '>{statValue}</span>
      <div className='progress-bar' style={barStyle}></div>
      
      <span className=''>{statName}</span>
    </div>
  );
};
