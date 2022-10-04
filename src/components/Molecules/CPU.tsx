import React, { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import { createBrandList, createList } from '../../util';
import BrandSelect from '../atoms/select/BrandSelect';
import ModelSelect from '../atoms/select/ModelSelect';
import { BRAND_WIDTH, MODEL_WIDTH } from '../../config';

const CPU = memo(() => {
  const [brandList, setBrandList] = useState<string[]>([]);
  const { cpuModelList, setCpuList } = useAppContext();

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetchCpuData = async () => {
      try {
        const response = await axios.get(
          'https://api.recursionist.io/builder/computers?type=cpu'
        );
        const list = createList(response.data);
        setCpuList(list);
        setBrandList(createBrandList(list));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCpuData();

    return () => {
      abortCtrl.abort();
    };
  }, [setCpuList]);

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
      <h2 className="heading">step1: Select your CPU</h2>
      <hr className="line1" />
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
        <BrandSelect items={brandList} type={'cpu'} width={BRAND_WIDTH} />
        <ModelSelect items={cpuModelList} type={'cpu'} width={MODEL_WIDTH} />
      </Box>
    </Box>
  );
});

export default CPU;
