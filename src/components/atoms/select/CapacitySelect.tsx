import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from '../../customStyle';
import { memo } from 'react';
import { CapacitySelectType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';
import { createModelList } from '../../../util';

export const CapacitySelect = memo((props: CapacitySelectType) => {
  const { items, width } = props;
  const {
    memoryCardBrand,
    memoryCardCapacity,
    setMemoryCardCapacity,
    memoryCardList,
    setMemoryCardModelList,
  } = useAppContext();

  const handleCapacityChange = (event: { target: { value: string } }) => {
    setMemoryCardCapacity(event.target.value as string);
    setMemoryCardModelList(
      createModelList(null, event.target.value, memoryCardBrand, memoryCardList)
    );
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

export default CapacitySelect;
