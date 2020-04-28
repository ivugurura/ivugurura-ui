import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './custom-style.scss';
import { Song } from './Song';
import { Play } from './Play';
import { Pause } from './Pause';
import { Bar } from './Bar';
import { useAudioPlayer } from './useAudioPlayer';

const songUrl = `${process.env.PUBLIC_URL}/Yesu-ni-inzira.mp3`;
export const Audio = () => {
  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
  } = useAudioPlayer();
  return (
    <Card>
      <Card.Header>
        <audio id='audio'>
          <source src={songUrl} />
          Your browser does not support the <code>audio</code> element.
        </audio>
        <Song songName='Yesu n inzira' songArtist='Ndi Hano Mwami' />
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <div className='player'>
              <div className='controls'>
                {playing ? (
                  <Pause handleClick={() => setPlaying(false)} />
                ) : (
                  <Play handleClick={() => setPlaying(true)} />
                )}
                <Bar
                  curTime={curTime}
                  duration={duration}
                  onTimeUpdate={(time) => setClickedTime(time)}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
