import React from 'react';

import { PageHelmet } from '../../../common/components/PageHelmet';

import { AboutTopic } from './AboutTopic';
import { Header } from './Header';
import { TopicDetails } from './TopicDetails';

export const TopicEditor2 = () => {
  console.log(' Topic editor 2');
  return (
    <PageHelmet title="Edit page title">
      <Header />
      <AboutTopic />
      <TopicDetails />
    </PageHelmet>
  );
};
