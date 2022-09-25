import React from 'react';
import Title from './Title';
import CPU from './CPU';
import GPU from './GPU';
import MemoryCard from './MemoryCard';
import Storage from './Storage';

const Layout = () => {
  return (
    <>
      <Title />
      <CPU />
      <GPU />
      <MemoryCard />
      <Storage />
    </>
  );
};

export default Layout;
