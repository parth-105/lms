import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Liveapp component with SSR disabled
const Liveapp = dynamic(() => import('@/component/live/Liveapp'), { ssr: false });

const Page = () => {
  return (
    <div>
      <Liveapp />
    </div>
  );
};

export default Page;
