import React from 'react';
import { Media, Card } from 'react-bootstrap';
import { textStyles } from '../../utils/styles';
import { translate } from '../utils';

export const RecentTopics = () => {
  return (
    <Card.Body style={textStyles.textTransparent}>
      <Card.Title style={textStyles.textFtTitle}>
        {translate('recentTopics')}
      </Card.Title>
      {[1, 2, 3].map((el) => (
        <Media.Body key={el}>
          <h6>{`Icyigisho cya ${el}`}</h6>
          <p>April, 20</p>
        </Media.Body>
      ))}
    </Card.Body>
  );
};
