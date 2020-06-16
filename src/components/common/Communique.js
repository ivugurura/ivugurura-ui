import React, { useEffect } from 'react';
import MarqueeText from 'react-marquee-text-component';
import { Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishedCommunique } from '../../redux/actions';

export const Communique = () => {
  const dispatch = useDispatch();
  const { communique } = useSelector(({ communiquePub }) => communiquePub);
  useEffect(() => {
    dispatch(getPublishedCommunique());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPublishedCommunique]);
  return (
    <Container fluid className='mt-2'>
      {communique ? (
        <Alert variant='success'>
          <h4>
            <MarqueeText text={communique.content} repeat={1} />
          </h4>
        </Alert>
      ) : null}
    </Container>
  );
};
