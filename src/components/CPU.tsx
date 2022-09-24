import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from './customStyle';

const CPU = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [brandList, setBrandList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);

  const handleBrandChange = (event: { target: { value: string } }) => {
    setBrand(event.target.value as string);
  };

  const handleModelChange = (event: { target: { value: string } }) => {
    setModel(event.target.value as string);
  };

  const createBrandList = (items: never[]): void => {
    let tempList: string[] = [];

    for (const item of items) {
      tempList.push(item['Brand']);
    }

    const array = [...new Set(tempList)];
    setBrandList(array);
  };

  const createModelList = (items: never[]): void => {
    let tempList: string[] = [];

    for (const item of items) {
      tempList.push(item['Model']);
    }

    setModelList(tempList);
  };

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetchCpuData = async () => {
      try {
        const response = await axios.get(
          'https://api.recursionist.io/builder/computers?type=cpu'
        );

        createBrandList(response.data);
        createModelList(response.data);
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
    <Box sx={{ paddingTop: 3, textAlign: 'center' }}>
      <h2 className="heading">step1: Select your CPU</h2>
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
        <FormControl sx={{ marginTop: 2, paddingX: 3 }} variant="standard">
          <InputLabel htmlFor="cpu-brand-select-label">Brand</InputLabel>
          <NativeSelect
            id="cpu-brand-select-label"
            value={brand}
            onChange={handleBrandChange}
            input={<CustomSelect />}
          >
            <option value="">Brand</option>
            {brandList.map((brand, index) => {
              return (
                <option value={brand} key={index}>
                  {brand}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <FormControl sx={{ marginTop: 2, paddingX: 3 }} variant="standard">
          <InputLabel htmlFor="cpu-model-select-label">Model</InputLabel>
          <NativeSelect
            id="cpu-model-select-label"
            value={model}
            onChange={handleModelChange}
            input={<CustomSelect />}
          >
            <option value="">Model</option>
            {modelList.map((model, index) => {
              return (
                <option value={model} key={index}>
                  {model}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CPU;
