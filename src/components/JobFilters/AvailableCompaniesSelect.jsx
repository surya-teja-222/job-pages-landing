import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select, OutlinedInput,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { uniqueCompaniesSelector } from '../../selectors/jobs';

export default function AvaliableCompaniesSelect() {
  const companies = useSelector(uniqueCompaniesSelector);

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
      <InputLabel>Company</InputLabel>
      <Select
        labelId="company_select"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label="company_select" />}
      >
        {companies.map((name) => (
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
