import React, { memo, useEffect } from 'react';
import Title from './Title';
import CPU from './CPU';
import GPU from './GPU';
import MemoryCard from './MemoryCard';
import Storage from './Storage';
import Result from './Result';

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
