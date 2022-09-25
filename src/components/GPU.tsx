import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from './customStyle';
import { useAppContext } from '../context/AppContext';
import { PCData } from '../types';
import { createList } from '../hooks';

const GPU = () => {
  const [brandList, setBrandList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const [gpuList, setGpuList] = useState<PCData[]>([]);
  const { gpuBrand, setGpuBrand, gpuModel, setGpuModel } = useAppContext();

  const handleBrandChange = (event: { target: { value: string } }) => {
    setGpuBrand(event.target.value as string);
    createModelList(event.target.value, gpuList);
  };

  const handleModelChange = (event: { target: { value: string } }) => {
    setGpuModel(event.target.value as string);
  };

  const createBrandList = (items: never[]): void => {
    let tempList: string[] = [];

    for (const item of items) {
      tempList.push(item['Brand']);
    }

    const array = [...new Set(tempList)];
    setBrandList(array);
  };

  const createModelList = (brand: string, gpuList: PCData[]): void => {
    let tempList: string[] = [];

    for (const gpuData of gpuList) {
      if (gpuData.brand === brand) {
        tempList.push(gpuData.model);
      }
    }

    setModelList(tempList);
  };

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetchGpuData = async () => {
      try {
        const response = await axios.get(
          'https://api.recursionist.io/builder/computers?type=gpu'
        );
        const list = createList(response.data);
        setGpuList(list);
        createBrandList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGpuData();

    return () => {
      abortCtrl.abort();
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
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
          alignItems: 'flex-start',
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
            width: 150,
            '@media screen and (max-width: 414px)': {
              marginLeft: 0,
              width: 'auto',
            },
          }}
          variant="standard"
        >
          <InputLabel htmlFor="gpu-brand-select-label">Brand</InputLabel>
          <NativeSelect
            id="gpu-brand-select-label"
            value={gpuBrand}
            onChange={handleBrandChange}
            input={<CustomSelect />}
          >
            <option value="">Brand</option>
            {brandList.map((gpuBrand, index) => {
              return (
                <option value={gpuBrand} key={index}>
                  {gpuBrand}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <FormControl
          sx={{
            marginTop: 2,
            marginLeft: 3,
            '@media screen and (max-width: 414px)': {
              marginLeft: 0,
            },
          }}
          variant="standard"
        >
          <InputLabel htmlFor="gpu-model-select-label">Model</InputLabel>
          <NativeSelect
            id="gpu-model-select-label"
            value={gpuModel}
            onChange={handleModelChange}
            input={<CustomSelect />}
          >
            <option value="">Model</option>
            {modelList.map((gpuModel, index) => {
              return (
                <option value={gpuModel} key={index}>
                  {gpuModel}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Box>
    </Box>
  );
};

export default GPU;
