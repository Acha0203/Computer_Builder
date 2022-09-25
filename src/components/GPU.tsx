import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from './customStyle';
import { useAppContext } from '../context/AppContext';
import { PCData } from '../types';
import {
  createBrandList,
  createList,
  createModelList,
  getPCData,
} from '../util';

const GPU = () => {
  const [brandList, setBrandList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const [gpuList, setGpuList] = useState<PCData[]>([]);
  const { gpuBrand, setGpuBrand, gpuModel, setGpuModel, setGpuData } =
    useAppContext();

  const handleBrandChange = (event: { target: { value: string } }) => {
    setGpuBrand(event.target.value as string);
    setModelList(createModelList('', event.target.value, gpuList));
  };

  const handleModelChange = (event: { target: { value: string } }) => {
    setGpuModel(event.target.value as string);
    setGpuData(getPCData(event.target.value, gpuList));
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
        setBrandList(createBrandList(list));
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
