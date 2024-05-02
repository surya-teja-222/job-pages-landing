import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select, OutlinedInput,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { uniqueLocationsSelector } from '../../selectors/jobs';

export default function AvaliableLocationSelect() {
  const locations = useSelector(uniqueLocationsSelector);

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel>Location</InputLabel>
      <Select
        labelId="location_select"
        multiple
        value={personName}
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
