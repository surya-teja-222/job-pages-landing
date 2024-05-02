import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select, OutlinedInput,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { availableRolesSelector } from '../../selectors/jobs';
import { filtersSelector } from '../../selectors/jobFilters';
import { setPreferredRoles } from '../../stores/jobFilters';

export default function AvaliableRolesSelect() {
  const dispatch = useDispatch();
  const availableRoles = useSelector(availableRolesSelector);
  const {
    preferredRoles,
  } = useSelector(filtersSelector);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    dispatch(setPreferredRoles(
      typeof value === 'string' ? value.split(',') : value,
    ));
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel id="title">Role</InputLabel>
      <Select
        labelId="role_select"
        multiple
        value={preferredRoles || []}
        onChange={handleChange}
        input={<OutlinedInput label="role_select" />}
      >
        {availableRoles.map((name) => (
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
