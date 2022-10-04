import React, { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import {
  createBrandList,
  createCapacityList,
  createList,
  createModelList,
} from '../../util';
import CapacitySelect from '../atoms/select/CapacitySelect';
import BrandSelect from '../atoms/select/BrandSelect';
import ModelSelect from '../atoms/select/ModelSelect';
import { BRAND_WIDTH, MODEL_WIDTH } from '../../config';

const MemoryCard = memo(() => {
  const [capacityList, setCapacityList] = useState<string[]>([]);
  const {
    memoryCardBrandList,
    setMemoryCardBrandList,
    memoryCardCapacity,
    setMemoryCardList,
    memoryCardModelList,
    setMemoryCardModelList,
  } = useAppContext();

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetchMemoryCardData = async () => {
      try {
        const response = await axios.get(
          'https://api.recursionist.io/builder/computers?type=ram'
        );
        const list = createList(response.data);
        setMemoryCardList(list);
        setCapacityList(createCapacityList(list));
        setMemoryCardBrandList(createBrandList(memoryCardCapacity, list));
        setMemoryCardModelList(createModelList(memoryCardCapacity, '', list));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMemoryCardData();

    return () => {
      abortCtrl.abort();
    };
  }, [
    memoryCardCapacity,
    setMemoryCardBrandList,
    setMemoryCardList,
    setMemoryCardModelList,
  ]);

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
      <h2 className="heading">step3: Select your Memory Card</h2>
      <hr className="line3" />
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
        <CapacitySelect items={capacityList} width={BRAND_WIDTH} />
        <BrandSelect
          items={memoryCardBrandList}
          type={'ram'}
          width={BRAND_WIDTH}
        />
        <ModelSelect
          items={memoryCardModelList}
          type={'ram'}
          width={MODEL_WIDTH}
        />
      </Box>
    </Box>
  );
});

export default MemoryCard;
