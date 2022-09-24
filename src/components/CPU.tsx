import React, { useEffect, useState } from 'react';
import './CPU.css';
import Box from '@mui/material/Box';
import axios from 'axios';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { CustomSelect } from './customStyle';

const CPU = () => {
  const [brand, setBrand] = useState('');
  const [brandList, setBrandList] = useState<string[]>([]);
  // const [modelList, setModelList] = useState<string[]>([]);

  const handleChange = (event: { target: { value: string } }) => {
    setBrand(event.target.value as string);
  };

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetchCpuData = async () => {
      try {
        const response = await axios.get(
          'https://api.recursionist.io/builder/computers?type=cpu'
        );

        const items = response.data;
        let tempList: string[] = [];

        for (const item of items) {
          tempList.push(item['Brand']);
        }

        const array = [...new Set(tempList)];
        setBrandList(array);
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
    <Box sx={{ paddingTop: 3 }}>
      <div>
        <h2 className="heading">step1: Select your CPU</h2>
      </div>
      <div>
        <FormControl sx={{ marginLeft: 5, marginTop: 2 }} variant="standard">
          <InputLabel htmlFor="cpu-brand-select-label">Brand</InputLabel>
          <NativeSelect
            id="cpu-brand-select-label"
            value={brand}
            onChange={handleChange}
            input={<CustomSelect />}
          >
            <option value="">
              <em style={{ color: 'red' }}>Brand</em>
            </option>
            {brandList.map((brand, index) => {
              return (
                <option value={brand} key={index}>
                  {brand}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </div>
    </Box>
  );
};

export default CPU;
