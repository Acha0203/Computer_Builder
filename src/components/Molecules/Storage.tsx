import React, { FC, memo, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import {
  createBrandList,
  createCapacityList,
  createList,
  createModelList,
} from '../../util';
import StorageTypeSelect from '../atoms/select/StorageTypeSelect';
import StorageCapacitySelect from '../atoms/select/StorageCapacitySelect';
import { MODEL_WIDTH, TYPE_WIDTH } from '../../config';
import BrandSelect from '../atoms/select/BrandSelect';
import ModelSelect from '../atoms/select/ModelSelect';

const Storage: FC = memo(() => {
  const {
    storageType,
    storageCapacity,
    storageCapacityList,
    setStorageCapacityList,
    storageBrand,
    storageBrandList,
    setStorageBrandList,
    storageModelList,
    setStorageModelList,
    setStorageList,
  } = useAppContext();

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetchStorageData = async () => {
      try {
        const response = await axios.get(
          `https://api.recursionist.io/builder/computers?type=${storageType?.toLowerCase()}`
        );
        const list = createList(response.data);
        setStorageList(list);
        setStorageCapacityList(createCapacityList(list));
        setStorageBrandList(
          createBrandList(storageType, storageCapacity, list)
        );
        setStorageModelList(
          createModelList(storageType, storageCapacity, storageBrand, list)
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchStorageData();

    return () => {
      abortCtrl.abort();
    };
  }, [
    setStorageBrandList,
    setStorageCapacityList,
    setStorageList,
    setStorageModelList,
    storageBrand,
    storageCapacity,
    storageType,
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
      <h2 className="heading">step4: Select your Storage</h2>
      <hr className="line4" />
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
        <StorageTypeSelect width={TYPE_WIDTH} />
        <StorageCapacitySelect items={storageCapacityList} width={TYPE_WIDTH} />
        <BrandSelect
          items={storageBrandList}
          type={'storage'}
          width={TYPE_WIDTH}
        />
        <ModelSelect
          items={storageModelList}
          type={'storage'}
          width={MODEL_WIDTH}
        />
      </Box>
    </Box>
  );
});

export default Storage;
