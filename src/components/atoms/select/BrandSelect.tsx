import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from '../../customStyle';
import { memo, useCallback, useEffect, useState } from 'react';
import { SelectType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';
import { createModelList } from '../../../util';

export const BrandSelect = memo((props: SelectType) => {
  const [brand, setBrand] = useState<string | null>('');
  const { items, type, width } = props;
  const {
    cpuBrand,
    setCpuBrand,
    setCpuModelList,
    cpuList,
    gpuBrand,
    setGpuBrand,
    setGpuModelList,
    gpuList,
    memoryCardBrand,
    setMemoryCardBrand,
    setMemoryCardModelList,
    memoryCardList,
    memoryCardCapacity,
    storageType,
    storageCapacity,
    storageBrand,
    setStorageBrand,
    setStorageModelList,
    storageList,
  } = useAppContext();

  const handleBrandChange = (event: { target: { value: string } }) => {
    switch (type) {
      case 'cpu':
        setCpuBrand(event.target.value as string);
        setCpuModelList(
          createModelList(null, null, event.target.value, cpuList)
        );
        break;
      case 'gpu':
        setGpuBrand(event.target.value as string);
        setGpuModelList(
          createModelList(null, null, event.target.value, gpuList)
        );
        break;
      case 'ram':
        setMemoryCardBrand(event.target.value as string);
        setMemoryCardModelList(
          createModelList(
            null,
            memoryCardCapacity,
            event.target.value,
            memoryCardList
          )
        );
        break;
      case 'storage':
        setStorageBrand(event.target.value as string);
        setStorageModelList(
          createModelList(
            storageType,
            storageCapacity,
            event.target.value,
            storageList
          )
        );
        break;
    }
  };

  const getBrand = useCallback(() => {
    switch (type) {
      case 'cpu':
        setBrand(cpuBrand);
        break;
      case 'gpu':
        setBrand(gpuBrand);
        break;
      case 'ram':
        setBrand(memoryCardBrand);
        break;
      case 'storage':
        setBrand(storageBrand);
        break;
    }
  }, [cpuBrand, gpuBrand, memoryCardBrand, storageBrand, type]);

  useEffect(() => {
    getBrand();
  }, [getBrand]);

  return (
    <FormControl
      sx={{
        marginTop: 2,
        marginLeft: 3,
        width: width,
        '@media screen and (max-width: 414px)': {
          marginLeft: 0,
          width: 'auto',
        },
      }}
      variant="standard"
    >
      <InputLabel htmlFor={`${type}-brand-select-label`}>Brand</InputLabel>
      <NativeSelect
        id={`${type}-brand-select-label`}
        value={brand}
        onChange={handleBrandChange}
        input={<CustomSelect />}
      >
        <option value="">Brand</option>
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

export default BrandSelect;
