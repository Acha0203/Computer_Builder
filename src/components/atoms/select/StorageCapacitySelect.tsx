import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from '../../customStyle';
import { memo } from 'react';
import { CapacitySelectType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';
import { createModelList } from '../../../util';

export const StorageCapacitySelect = memo((props: CapacitySelectType) => {
  const { items, width } = props;
  const {
    storageType,
    storageCapacity,
    storageBrand,
    setStorageCapacity,
    storageList,
    setStorageModelList,
  } = useAppContext();

  const handleCapacityChange = (event: { target: { value: string } }) => {
    setStorageCapacity(event.target.value as string);
    setStorageModelList(
      createModelList(
        storageType,
        event.target.value,
        storageBrand,
        storageList
      )
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
        Storage
      </InputLabel>
      <NativeSelect
        id="memory-card-capacity-select-label"
        value={storageCapacity}
        onChange={handleCapacityChange}
        input={<CustomSelect />}
      >
        <option value="">Storage</option>
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

export default StorageCapacitySelect;
