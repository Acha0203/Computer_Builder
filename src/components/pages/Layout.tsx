import React, { memo, useEffect } from 'react';
import Title from '../atoms/header/Title';
import CPU from '../molecules/CPU';
import GPU from '../molecules/GPU';
import MemoryCard from '../molecules/MemoryCard';
import Storage from '../molecules/Storage';
import Result from '../molecules/Result';

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
