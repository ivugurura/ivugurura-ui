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
  return (
    <div>
      <iframe
        className="components"
        title="RadioKing"
        color="#fff"
        src="https://player.radioking.io/ubugorozi/?c=%234C7991&c2=%23ffffff&f=h&i=0&p=0&s=0&li=0&popup=0&plc=NaN&h=undefined&l=100&v=2&fullsize"
        style={{
          width: '100%',
          height: '16rem',
          border: 'none',
          borderRadius: '32px',
        }}
      />
    </div>
  );
};
