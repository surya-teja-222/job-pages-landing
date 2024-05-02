import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';

export default function MinBasePay() {
  const [age, setAge] = React.useState(null);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel>Min Pay</InputLabel>
      <Select
        labelId="exp"
        value={age}
        label="Experience"
        onChange={handleChange}
      >
        {
          Array.from({ length: 10 }, (_, i) => i * 10).map((i) => (
            <MenuItem key={i} value={i}>{`${i} K USD`}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
