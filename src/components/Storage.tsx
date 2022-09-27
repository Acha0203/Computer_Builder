import React, { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from './customStyle';
import { useAppContext } from '../context/AppContext';
import {
  createBrandList,
  createCapacityList,
  createList,
  createModelList,
  getPCData,
} from '../util';
import { PCData } from '../types';

const Storage = memo(() => {
  const [capacityList, setCapacityList] = useState<string[]>([]);
  const [brandList, setBrandList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const [storageList, setStorageList] = useState<PCData[]>([]);
  const {
    storageType,
    setStorageType,
    storageCapacity,
    setStorageCapacity,
    storageBrand,
    setStorageBrand,
    storageModel,
    setStorageModel,
    setStorageData,
  } = useAppContext();

  const handleTypeChange = (event: { target: { value: string } }) => {
    setStorageType(event.target.value as string);
  };

  const handleCapacityChange = (event: { target: { value: string } }) => {
    setStorageCapacity(event.target.value as string);
    setModelList(
      createModelList(event.target.value, storageBrand, storageList)
    );
  };

  const handleBrandChange = (event: { target: { value: string } }) => {
    setStorageBrand(event.target.value as string);
    setModelList(
      createModelList(storageCapacity, event.target.value, storageList)
    );
  };

  const handleModelChange = (event: { target: { value: string } }) => {
    setStorageModel(event.target.value as string);
    setStorageData(getPCData(event.target.value, storageList));
  };

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetchStorageData = async () => {
      try {
        const response = await axios.get(
          `https://api.recursionist.io/builder/computers?type=${storageType?.toLowerCase()}`
        );
        const list = createList(response.data);
        setStorageList(list);
        setCapacityList(createCapacityList(list));
        setBrandList(createBrandList(list));
      } catch (error) {
        console.log(error);
      }
    };

    fetchStorageData();

    return () => {
      abortCtrl.abort();
    };
  }, [storageType]);

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
        <FormControl
          sx={{
            marginTop: 2,
            marginLeft: 3,
            width: 120,
            '@media screen and (max-width: 414px)': {
              marginLeft: 0,
              width: 'auto',
            },
          }}
          variant="standard"
        >
          <InputLabel htmlFor="storage-type-select-label">
            HDD or SSD
          </InputLabel>
          <NativeSelect
            id="storage-type-select-label"
            value={storageType}
            onChange={handleTypeChange}
            input={<CustomSelect />}
          >
            <option value="HDD">HDD</option>
            <option value="SSD">SSD</option>
          </NativeSelect>
        </FormControl>
        <FormControl
          sx={{
            marginTop: 2,
            marginLeft: 3,
            width: 120,
            '@media screen and (max-width: 414px)': {
              marginLeft: 0,
              width: 'auto',
            },
          }}
          variant="standard"
        >
          <InputLabel htmlFor="storage-capacity-select-label">
            Storage
          </InputLabel>
          <NativeSelect
            id="storage-capacity-select-label"
            value={storageCapacity}
            onChange={handleCapacityChange}
            input={<CustomSelect />}
          >
            <option value="">Storage</option>
            {capacityList.map((storageCapacity, index) => {
              return (
                <option value={storageCapacity} key={index}>
                  {storageCapacity}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <FormControl
          sx={{
            marginTop: 2,
            marginLeft: 3,
            width: 120,
            '@media screen and (max-width: 414px)': {
              marginLeft: 0,
              width: 'auto',
            },
          }}
          variant="standard"
        >
          <InputLabel htmlFor="storage-brand-select-label">Brand</InputLabel>
          <NativeSelect
            id="storage-brand-select-label"
            value={storageBrand}
            onChange={handleBrandChange}
            input={<CustomSelect />}
          >
            <option value="">Brand</option>
            {brandList.map((storageBrand, index) => {
              return (
                <option value={storageBrand} key={index}>
                  {storageBrand}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <FormControl
          sx={{
            marginTop: 2,
            marginLeft: 3,
            '@media screen and (max-width: 600px)': {
              width: 120,
            },
            '@media screen and (max-width: 414px)': {
              marginLeft: 0,
              width: 'auto',
            },
          }}
          variant="standard"
        >
          <InputLabel htmlFor="storage-model-select-label">Model</InputLabel>
          <NativeSelect
            id="storage-model-select-label"
            value={storageModel}
            onChange={handleModelChange}
            input={<CustomSelect />}
          >
            <option value="">Model</option>
            {modelList.map((storageModel, index) => {
              return (
                <option value={storageModel} key={index}>
                  {storageModel}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Box>
    </Box>
  );
});

export default Storage;
