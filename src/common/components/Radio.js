import React from 'react';

export const Radio = () => (
  <iframe
    title="radio"
    src="https://studio18.radiolize.com/public/ijwi_ry_ubugorozi/embed"
    allowFullScreen
    style={{ width: '100%' }}
  />
);

export const RadioKing = () => {
  const boxShadow = '0px 0px 20px 0px rgba(0,0,0,0.3)';
  return (
    <iframe
      title="RadioKing"
      src="https://player.radioking.io/ubugorozi/?c=%2316222A&c2=%23ffffff&f=h&i=0&p=0&s=0&li=0&popup=0&plc=NaN&h=undefined&l=100&v=2&fullsize"
      style={{
        borderRadius: '5px',
        width: '100%',
        '-webkit-box-shadow': boxShadow,
        '-moz-box-shadow': boxShadow,
        boxShadow,
      }}
    />
  );
};
