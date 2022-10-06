import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from '../../customStyle';
import { FC, memo } from 'react';
import { SelectType } from '../../../types';
import { useAppContext } from '../../../context/AppContext';
import { createModelList } from '../../../util';

export const StorageTypeSelect: FC<Pick<SelectType, 'width'>> = memo(
  (props) => {
    const { width } = props;
    const {
      storageType,
      storageCapacity,
      storageBrand,
      setStorageType,
      storageList,
      setStorageModelList,
    } = useAppContext();

    const handleTypeChange = (event: { target: { value: string } }) => {
      setStorageType(event.target.value as string);
      setStorageModelList(
        createModelList(
          event.target.value,
          storageCapacity,
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
        <InputLabel htmlFor="storage-type-select-label">HDD or SSD</InputLabel>
        <NativeSelect
          id="storage-type-select-label"
          value={storageType}
          onChange={handleTypeChange}
          input={<CustomSelect />}
        >
          <option value="HDD">HDD</option>
          <option value="SSD">SSD</option>
        </NativeSelect>
      </FormControl>
    );
  }
);

export default StorageTypeSelect;
