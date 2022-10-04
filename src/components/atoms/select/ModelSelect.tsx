import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from '../../customStyle';
import { memo } from 'react';
import { SelectType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';
import { getPCData } from '../../../util';

export const ModelSelect = memo((props: SelectType) => {
  const { items, type, width } = props;
  const {
    setCpuModel,
    setCpuData,
    cpuList,
    setGpuModel,
    setGpuData,
    setMemoryCardModel,
    setMemoryCardData,
    setStorageModel,
    setStorageData,
  } = useAppContext();

  const handleModelChange = (event: { target: { value: string } }) => {
    switch (type) {
      case 'cpu':
        setCpuModel(event.target.value as string);
        setCpuData(getPCData(event.target.value, cpuList));
        break;
      case 'gpu':
        setGpuModel(event.target.value as string);
        setGpuData(getPCData(event.target.value, cpuList));
        break;
      case 'ram':
        setMemoryCardModel(event.target.value as string);
        setMemoryCardData(getPCData(event.target.value, cpuList));
        break;
      case 'storage':
        setStorageModel(event.target.value as string);
        setStorageData(getPCData(event.target.value, cpuList));
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
        },
      }}
      variant="standard"
    >
      <InputLabel htmlFor={`${type}-model-select-label`}>Model</InputLabel>
      <NativeSelect
        id={`${type}-model-select-label`}
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
