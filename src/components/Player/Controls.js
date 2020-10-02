import React from 'react';

export class Controls extends React.Component {
  render() {
    let playClass = 'fa fa-fw ';
    if (!this.props.isPlaying) {
      playClass += 'fa-play';
    } else {
      playClass += 'fa-pause';
    }

    let likeClass = 'button like ';
    let heartClass = 'fa fa-fw ';
    if (!this.props.isLiked) {
      heartClass += 'fa-heart-o';
    } else {
      likeClass += 'is-liked';
      heartClass += 'fa-heart';
    }

    return (
      <div className='controls'>
        <button type='button' className='button repeat'>
          <span className='icon'>
            <i className='fa fa-fw fa-repeat'></i>
          </span>
        </button>
        <button
          type='button'
          className='button prev'
          onClick={this.props.prevTrack}
        >
          <span className='icon'>
            <i className='fa fa-fw fa-step-backward'></i>
          </span>
        </button>
        <button
          type='button'
          className='button play'
          onClick={this.props.togglePlay}
        >
          <span className='icon'>
            <i className={playClass}></i>
          </span>
        </button>
        <button
          type='button'
          className='button next'
          onClick={this.props.nextTrack}
        >
          <span className='icon'>
            <i className='fa fa-fw fa-step-forward'></i>
          </span>
        </button>
        <button
          type='button'
          className={likeClass}
          onClick={this.props.likeTrack}
        >
          <span className='icon'>
            <i className={heartClass}></i>
          </span>
        </button>
      </div>
    );
  }
}
