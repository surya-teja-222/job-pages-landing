import React from 'react';

import {
  FormControl, FormControlLabel, Checkbox,
} from '@mui/material';

function RemoteOrOnSiteFilter() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox defaultChecked onChange={handleChange} checked={checked} />
        }
        label="Select if You Prefer Remote Only Opportunities"
      />
    </FormControl>
  );
}

export default RemoteOrOnSiteFilter;
