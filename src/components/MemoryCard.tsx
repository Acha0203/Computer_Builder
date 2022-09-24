import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from './customStyle';
import { useAppContext } from '../context/AppContext';
import { MemoryCadeData } from '../types';

const MemoryCard = () => {
  const [capacityList, setCapacityList] = useState<string[]>([]);
  const [brandList, setBrandList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const [memoryCardList, setMemoryCardList] = useState<MemoryCadeData[]>([]);
  const {
    memoryCardCapacity,
    setMemoryCardCapacity,
    memoryCardBrand,
    setMemoryCardBrand,
    memoryCardModel,
    setMemoryCardModel,
  } = useAppContext();

  const handleCapacityChange = (event: { target: { value: string } }) => {
    setMemoryCardCapacity(event.target.value as string);
    createModelList(event.target.value, memoryCardBrand, memoryCardList);
  };

  const handleBrandChange = (event: { target: { value: string } }) => {
    setMemoryCardBrand(event.target.value as string);
    createModelList(memoryCardCapacity, event.target.value, memoryCardList);
  };

  const handleModelChange = (event: { target: { value: string } }) => {
    setMemoryCardModel(event.target.value as string);
  };

  const createMemoryCardList = (items: never[]): void => {
    let tempList: MemoryCadeData[] = [];

    for (const item of items) {
      let tempData: MemoryCadeData = {
        type: 'MemoryCard',
        partNumber: '',
        brand: '',
        model: '',
        rank: 0,
        benchmark: 0,
        capacity: '',
      };

      tempData.type = item['Type'];
      tempData.partNumber = item['Part Number'];
      tempData.brand = item['Brand'];
      tempData.model = item['Model'];
      tempData.rank = item['Rank'];
      tempData.benchmark = item['Benchmark'];

      const words = tempData.model.split(' ');
      tempData.capacity = words[words.length - 1];

      tempList.push(tempData);
    }
    setMemoryCardList(tempList);
  };

  const createCapacityList = (memoryCardList: MemoryCadeData[]): void => {
    let tempList: string[] = [];

    for (const memoryCard of memoryCardList) {
      tempList.push(memoryCard.capacity);
    }

    const array = [...new Set(tempList)];
    setCapacityList(array);
  };

  const createBrandList = (items: never[]): void => {
    let tempList: string[] = [];

    for (const item of items) {
      tempList.push(item['Brand']);
    }

    const array = [...new Set(tempList)];
    setBrandList(array);
  };

  const createModelList = (
    capacity: string | null,
    brand: string | null,
    memoryCardList: MemoryCadeData[]
  ): void => {
    let tempList: string[] = [];

    for (const memoryCardData of memoryCardList) {
      if (
        memoryCardData.brand === brand &&
        memoryCardData.capacity === capacity &&
        brand !== null &&
        capacity !== null
      ) {
        tempList.push(memoryCardData.model);
      }
    }

    setModelList(tempList);
  };

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetchMemoryCardData = async () => {
      try {
        const response = await axios.get(
          'https://api.recursionist.io/builder/computers?type=ram'
        );
        createMemoryCardList(response.data);
        createCapacityList(memoryCardList);
        createBrandList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMemoryCardData();

    return () => {
      abortCtrl.abort();
    };
  }, [memoryCardList]);

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
      <h2 className="heading">step3: Select your Memory Card</h2>
      <hr className="line3" />
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
          sx={{ marginTop: 2, marginX: 3, width: 150 }}
          variant="standard"
        >
          <InputLabel htmlFor="memory-card-capacity-select-label">
            How Many?
          </InputLabel>
          <NativeSelect
            id="memory-card-capacity-select-label"
            value={memoryCardCapacity}
            onChange={handleCapacityChange}
            input={<CustomSelect />}
          >
            <option value="">How Many?</option>
            {capacityList.map((memoryCardCapacity, index) => {
              return (
                <option value={memoryCardCapacity} key={index}>
                  {memoryCardCapacity}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <FormControl sx={{ marginTop: 2, marginX: 3 }} variant="standard">
          <InputLabel htmlFor="memory-card-brand-select-label">
            Brand
          </InputLabel>
          <NativeSelect
            id="memory-card-brand-select-label"
            value={memoryCardBrand}
            onChange={handleBrandChange}
            input={<CustomSelect />}
          >
            <option value="">Brand</option>
            {brandList.map((memoryCardBrand, index) => {
              return (
                <option value={memoryCardBrand} key={index}>
                  {memoryCardBrand}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <FormControl sx={{ marginTop: 2, marginX: 3 }} variant="standard">
          <InputLabel htmlFor="memory-card-model-select-label">
            Model
          </InputLabel>
          <NativeSelect
            id="memory-card-model-select-label"
            value={memoryCardModel}
            onChange={handleModelChange}
            input={<CustomSelect />}
          >
            <option value="">Model</option>
            {modelList.map((memoryCardModel, index) => {
              return (
                <option value={memoryCardModel} key={index}>
                  {memoryCardModel}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Box>
    </Box>
  );
};

export default MemoryCard;