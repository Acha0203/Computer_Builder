import React, { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import { createBrandList, createList } from '../../util';
import BrandSelect from '../atoms/select/BrandSelect';
import ModelSelect from '../atoms/select/ModelSelect';
import { BRAND_WIDTH, MODEL_WIDTH } from '../../config';

const GPU = memo(() => {
  const [brandList, setBrandList] = useState<string[]>([]);
  const { setGpuList, gpuModelList } = useAppContext();

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetchGpuData = async () => {
      try {
        const response = await axios.get(
          'https://api.recursionist.io/builder/computers?type=gpu'
        );
        const list = createList(response.data);
        setGpuList(list);
        setBrandList(createBrandList(list));
      } catch (error) {
        console.log(error);
      }
    };

    fetchGpuData();

    return () => {
      abortCtrl.abort();
    };
  }, [setGpuList]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 3,
        textAlign: 'left',
        '@media screen and (max-width: 414px)': {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <h2 className="heading">step2: Select your GPU</h2>
      <hr className="line2" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          '@media screen and (max-width: 414px)': {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <BrandSelect items={brandList} type={'gpu'} width={BRAND_WIDTH} />
        <ModelSelect items={gpuModelList} type={'gpu'} width={MODEL_WIDTH} />
      </Box>
    </Box>
  );
});

export default GPU;
