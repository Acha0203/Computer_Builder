import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from '../../customStyle';
import { memo } from 'react';
import { SelectType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';
import { createModelList } from '../../../util';

export const BrandSelect = memo((props: SelectType) => {
  const { items, type, width } = props;
  const {
    setCpuBrand,
    setCpuModelList,
    cpuList,
    setGpuBrand,
    setGpuModelList,
    gpuList,
    setMemoryCardBrand,
    setMemoryCardModelList,
    memoryCardList,
    setStorageBrand,
    setStorageModelList,
    storageList,
  } = useAppContext();

  const handleBrandChange = (event: { target: { value: string } }) => {
    switch (type) {
      case 'cpu':
        setCpuBrand(event.target.value as string);
        setCpuModelList(createModelList('', event.target.value, cpuList));
        break;
      case 'gpu':
        setGpuBrand(event.target.value as string);
        setGpuModelList(createModelList('', event.target.value, gpuList));
        break;
      case 'ram':
        setMemoryCardBrand(event.target.value as string);
        setMemoryCardModelList(
          createModelList('', event.target.value, memoryCardList)
        );
        break;
      case 'storage':
        setStorageBrand(event.target.value as string);
        setStorageModelList(
          createModelList('', event.target.value, storageList)
        );
        break;
    }
  };

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
