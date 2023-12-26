import React from 'react';
import Collections from '@app/components/Collections';

export default function CollectionPage({ params }: any) {
  if (!params.slug) {
    return;
  }
  return <Collections collectionId={params.slug} />;
}
