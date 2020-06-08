import React from 'react';
import { AdminPageHeader } from '../components/common';

export const AdminAudio = () => {
  return (
    <>
      <AdminPageHeader
        name='Media/audio/songs'
        btnTitle='Add audio'
        btnAction={() => console.log('work')}
      />
    </>
  );
};
