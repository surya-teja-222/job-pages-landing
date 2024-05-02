import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';

export default function MinExperienceSelector() {
  const [age, setAge] = React.useState(null);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel>Min Exp</InputLabel>
      <Select
        labelId="exp"
        value={age}
        label="Experience"
        onChange={handleChange}
      >
        {
          Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
            <MenuItem key={i} value={i}>{i}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
