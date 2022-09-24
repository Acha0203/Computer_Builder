import React from 'react';
import Title from './Title';
import CPU from './CPU';
import GPU from './GPU';
import MemoryCard from './MemoryCard';

const Layout = () => {
  return (
    <>
      <Title />
      <CPU />
      <GPU />
      <MemoryCard />
    </>
  );
};

export default Layout;
