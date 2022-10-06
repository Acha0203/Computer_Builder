import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from '../../customStyle';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { PCData, SelectType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';
import { getPCData } from '../../../util';

export const ModelSelect: FC<SelectType> = memo((props) => {
  const [model, setModel] = useState<string | null>('');
  const { items, type, width } = props;
  const {
    setCpuBrand,
    cpuModel,
    setCpuModel,
    setCpuData,
    cpuList,
    setGpuBrand,
    gpuModel,
    setGpuModel,
    setGpuData,
    gpuList,
    setMemoryCardCapacity,
    setMemoryCardBrand,
    memoryCardModel,
    setMemoryCardModel,
    setMemoryCardData,
    memoryCardList,
    setStorageType,
    setStorageCapacity,
    setStorageBrand,
    storageModel,
    setStorageModel,
    setStorageData,
    storageList,
  } = useAppContext();

  const handleModelChange = (event: { target: { value: string } }) => {
    let tempData: PCData = {
      type: '',
      partNumber: '',
      brand: '',
      model: '',
      rank: 0,
      benchmark: 0,
      capacity: '',
    };

    switch (type) {
      case 'cpu':
        setCpuModel(event.target.value as string);
        tempData = getPCData(event.target.value, cpuList);
        setCpuData(tempData);
        setCpuBrand(tempData.brand);
        break;
      case 'gpu':
        setGpuModel(event.target.value as string);
        tempData = getPCData(event.target.value, gpuList);
        setGpuData(tempData);
        setGpuBrand(tempData.brand);
        break;
      case 'ram':
        setMemoryCardModel(event.target.value as string);
        tempData = getPCData(event.target.value, memoryCardList);
        setMemoryCardData(tempData);
        setMemoryCardCapacity(tempData.capacity);
        setMemoryCardBrand(tempData.brand);
        break;
      case 'storage':
        setStorageModel(event.target.value as string);
        tempData = getPCData(event.target.value, storageList);
        setStorageData(tempData);
        setStorageType(tempData.type);
        setStorageCapacity(tempData.capacity);
        setStorageBrand(tempData.brand);
        break;
    }
  };

  const getModel = useCallback(() => {
    switch (type) {
      case 'cpu':
        setModel(cpuModel);
        break;
      case 'gpu':
        setModel(gpuModel);
        break;
      case 'ram':
        setModel(memoryCardModel);
        break;
      case 'storage':
        setModel(storageModel);
        break;
    }
  }, [cpuModel, gpuModel, memoryCardModel, storageModel, type]);

  useEffect(() => {
    getModel();
  }, [getModel]);

  return (
    <FormControl
      sx={{
        marginTop: 2,
        marginLeft: 3,
        width: width,
        '@media screen and (max-width: 414px)': {
          marginLeft: 0,
        },
      }}
      variant="standard"
    >
      <InputLabel htmlFor={`${type}-model-select-label`}>Model</InputLabel>
      <NativeSelect
        id={`${type}-model-select-label`}
        value={model}
        onChange={handleModelChange}
        input={<CustomSelect />}
      >
        <option value="">Model</option>
        {items.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
});

export default ModelSelect;
