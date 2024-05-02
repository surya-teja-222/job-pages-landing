import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setMinExp } from '../../stores/jobFilters';
import { filtersSelector } from '../../selectors/jobFilters';

export default function MinExperienceSelector() {
  const dispatch = useDispatch();

  const {
    minExp,
  } = useSelector(filtersSelector);

  const handleChange = (event) => {
    dispatch(setMinExp(event.target.value));
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel>Min Exp</InputLabel>
      <Select
        labelId="minExp"
        value={minExp}
        label="Experience"
        onChange={handleChange}
      >
        {
          Array.from({ length: 11 }, (_, i) => i).map((i) => (
            <MenuItem key={i} value={i}>{`${i} Years`}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
