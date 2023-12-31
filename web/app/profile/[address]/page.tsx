import ProfileView from '@app/components/ProfileView';
import React from 'react';

export default function page({ params }: any) {
  if (!params.address) {
    return;
  }
  return <ProfileView address={params.address} />;
}
