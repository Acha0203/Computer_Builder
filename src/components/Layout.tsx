import React, { memo, useEffect } from 'react';
import Title from './Title';
import CPU from './Molecules/CPU';
import GPU from './Molecules/GPU';
import MemoryCard from './Molecules/MemoryCard';
import Storage from './Molecules/Storage';
import Result from './Molecules/Result';

const Layout = memo(() => {
  useEffect(() => {
    document.title = 'Computer Builder';
  }, []);

  return (
    <>
      <Title />
      <CPU />
      <GPU />
      <MemoryCard />
      <Storage />
      <Result />
    </>
  );
});

export default Layout;
