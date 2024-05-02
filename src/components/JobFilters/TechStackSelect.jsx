import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select, OutlinedInput,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { availableTechStackSelector } from '../../selectors/jobs';
import { filtersSelector } from '../../selectors/jobFilters';
import { setPreferedTechStack } from '../../stores/jobFilters';

export default function AvaliableTechStackSelect() {
  const dispatch = useDispatch();
  const availableTechStack = useSelector(availableTechStackSelector);
  const {
    preferedTechStack,
  } = useSelector(filtersSelector);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(setPreferedTechStack(
      typeof value === 'string' ? value.split(',') : value,
    ));
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel id="title">Stack</InputLabel>
      <Select
        labelId="tech_stack"
        multiple
        value={preferedTechStack || []}
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
