import React, { memo, useEffect, useState } from 'react';
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

const CPU = memo(() => {
  const [brandList, setBrandList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const [cpuList, setCpuList] = useState<PCData[]>([]);
  const { cpuBrand, setCpuBrand, cpuModel, setCpuModel, setCpuData } =
    useAppContext();

  const handleBrandChange = (event: { target: { value: string } }) => {
    setCpuBrand(event.target.value as string);
    setModelList(createModelList('', event.target.value, cpuList));
  };

  const handleModelChange = (event: { target: { value: string } }) => {
    setCpuModel(event.target.value as string);
    setCpuData(getPCData(event.target.value, cpuList));
  };

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
          <InputLabel htmlFor="cpu-brand-select-label">Brand</InputLabel>
          <NativeSelect
            id="cpu-brand-select-label"
            value={cpuBrand}
            onChange={handleBrandChange}
            input={<CustomSelect />}
          >
            <option value="">Brand</option>
            {brandList.map((cpuBrand, index) => {
              return (
                <option value={cpuBrand} key={index}>
                  {cpuBrand}
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
          <InputLabel htmlFor="cpu-model-select-label">Model</InputLabel>
          <NativeSelect
            id="cpu-model-select-label"
            value={cpuModel}
            onChange={handleModelChange}
            input={<CustomSelect />}
          >
            <option value="">Model</option>
            {modelList.map((cpuModel, index) => {
              return (
                <option value={cpuModel} key={index}>
                  {cpuModel}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Box>
    </Box>
  );
});

export default CPU;
