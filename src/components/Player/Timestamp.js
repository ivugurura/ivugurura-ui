import React from 'react';

export class Timestamp extends React.Component {
  convertTime(time) {
    let mins = Math.floor(time / 60);
    let seconds = time - mins * 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    time = mins + ':' + seconds;
    return time;
  }

  render() {
    return (
      <div className='timestamp'>
        <div className='timestamp__current'>
          {this.convertTime(this.props.current)}
        </div>
        <div className='timestamp__progress'>
          <div
            style={{
              width:
                Math.floor((this.props.current / this.props.duration) * 100) +
                '%',
            }}
          ></div>
        </div>
        <div className='timestamp__total'>
          {this.convertTime(this.props.duration - this.props.current)}
        </div>
      </div>
    );
  }
}
