import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select, OutlinedInput,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { uniqueLocationsSelector } from '../../selectors/jobs';
import { filtersSelector } from '../../selectors/jobFilters';
import { setPreferredLocations } from '../../stores/jobFilters';

export default function AvaliableLocationSelect() {
  const dispatch = useDispatch();
  const locations = useSelector(uniqueLocationsSelector);
  const {
    preferredLocations,
  } = useSelector(filtersSelector);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(setPreferredLocations(
      typeof value === 'string' ? value.split(',') : value,
    ));
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel>Location</InputLabel>
      <Select
        labelId="location_select"
        multiple
        value={preferredLocations || []}
        onChange={handleChange}
        input={<OutlinedInput label="location_select" />}
      >
        {locations.map((name) => (
          <MenuItem
            key={name}
            value={name}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
