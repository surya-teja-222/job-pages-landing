import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select, OutlinedInput,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { availableRolesSelector } from '../../selectors/jobs';

export default function AvaliableRolesSelect() {
  const availableRoles = useSelector(availableRolesSelector);

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
      <InputLabel id="title">Role</InputLabel>
      <Select
        labelId="role_select"
        multiple
        value={personName}
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
