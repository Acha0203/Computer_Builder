import React, { memo, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import { createBrandList, createList, createModelList } from '../../util';
import BrandSelect from '../atoms/select/BrandSelect';
import ModelSelect from '../atoms/select/ModelSelect';
import { BRAND_WIDTH, MODEL_WIDTH } from '../../config';

const GPU = memo(() => {
  const {
    gpuBrand,
    gpuBrandList,
    setGpuBrandList,
    setGpuList,
    gpuModelList,
    setGpuModelList,
  } = useAppContext();

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetchGpuData = async () => {
      try {
        const response = await axios.get(
          'https://api.recursionist.io/builder/computers?type=gpu'
        );
        const list = createList(response.data);
        setGpuList(list);
        setGpuBrandList(createBrandList(null, null, list));
        setGpuModelList(createModelList(null, null, gpuBrand, list));
      } catch (error) {
        console.log(error);
      }
    };

    fetchGpuData();

    return () => {
      abortCtrl.abort();
    };
  }, [gpuBrand, setGpuBrandList, setGpuList, setGpuModelList]);

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
        <BrandSelect items={gpuBrandList} type={'gpu'} width={BRAND_WIDTH} />
        <ModelSelect items={gpuModelList} type={'gpu'} width={MODEL_WIDTH} />
      </Box>
    </Box>
  );
});

export default GPU;
