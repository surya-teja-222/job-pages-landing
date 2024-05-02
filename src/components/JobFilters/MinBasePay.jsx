import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { filtersSelector } from '../../selectors/jobFilters';
import { setMinBasePay } from '../../stores/jobFilters';

export default function MinBasePay() {
  const dispatch = useDispatch();

  const {
    minBasePay,
  } = useSelector(filtersSelector);

  const handleChange = (event) => {
    dispatch(setMinBasePay(event.target.value));
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel>Min Pay</InputLabel>
      <Select
        labelId="base_pay_select"
        value={minBasePay}
        label="Experience"
        onChange={handleChange}
      >
        {
          Array.from({ length: 11 }, (_, i) => i * 10).map((i) => (
            <MenuItem key={i} value={i}>{`${i} K USD`}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
