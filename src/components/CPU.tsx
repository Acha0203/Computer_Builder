import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from './customStyle';
import { useAppContext } from '../context/AppContext';
import { PCData } from '../types';

const CPU = () => {
  const [brandList, setBrandList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const [cpuList, setCpuList] = useState<PCData[]>([]);
  const { cpuBrand, setCpuBrand, cpuModel, setCpuModel } = useAppContext();

  const handleBrandChange = (event: { target: { value: string } }) => {
    setCpuBrand(event.target.value as string);
    createModelList(event.target.value, cpuList);
  };

  const handleModelChange = (event: { target: { value: string } }) => {
    setCpuModel(event.target.value as string);
  };

  const createCpuList = (items: never[]): void => {
    let tempList: PCData[] = [];

    for (const item of items) {
      let tempData: PCData = {
        type: 'CPU',
        partNumber: '',
        brand: '',
        model: '',
        rank: 0,
        benchmark: 0,
      };

      tempData.type = item['Type'];
      tempData.partNumber = item['Part Number'];
      tempData.brand = item['Brand'];
      tempData.model = item['Model'];
      tempData.rank = item['Rank'];
      tempData.benchmark = item['Benchmark'];

      tempList.push(tempData);
    }
    setCpuList(tempList);
  };

  const createBrandList = (items: never[]): void => {
    let tempList: string[] = [];

    for (const item of items) {
      tempList.push(item['Brand']);
    }

    const array = [...new Set(tempList)];
    setBrandList(array);
  };

  const createModelList = (brand: string, cpuList: PCData[]): void => {
    let tempList: string[] = [];

    for (const cpuData of cpuList) {
      if (cpuData.brand === brand) {
        tempList.push(cpuData.model);
      }
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
        createCpuList(response.data);
        createBrandList(response.data);
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
        textAlign: 'center',
      }}
    >
      <h2 className="heading">step1: Select your CPU</h2>
      <hr className="line1" />
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
        <FormControl sx={{ marginTop: 2, marginX: 3 }} variant="standard">
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
        <FormControl sx={{ marginTop: 2, marginX: 3 }} variant="standard">
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
};

export default CPU;
