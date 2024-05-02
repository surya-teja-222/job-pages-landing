import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select, OutlinedInput,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { availableTechStackSelector } from '../../selectors/jobs';

export default function AvaliableTechStackSelect() {
  const availableTechStack = useSelector(availableTechStackSelector);

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
      <InputLabel id="title">Stack</InputLabel>
      <Select
        labelId="tech_stack"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label="tech_stack" />}
      >
        {availableTechStack.map((name) => (
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
