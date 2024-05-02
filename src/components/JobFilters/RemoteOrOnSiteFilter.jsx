import React from 'react';

import {
  FormControl, FormControlLabel, Checkbox,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setPrefersOnsiteOrRemote } from '../../stores/jobFilters';
import { filtersSelector } from '../../selectors/jobFilters';

function RemoteOrOnSiteFilter() {
  const dispatch = useDispatch();

  const {
    prefersOnsiteOrRemote,
  } = useSelector(filtersSelector);

  const handleChange = (event) => {
    dispatch(setPrefersOnsiteOrRemote(
      event.target.checked ? 'remote' : null,
    ));
  };

  return (
    <FormControl>
      <FormControlLabel
        control={(
          <Checkbox
            defaultChecked
            onChange={handleChange}
            checked={
              prefersOnsiteOrRemote === 'remote'
            }
          />
        )}
        label="Select if You Prefer Remote Only Opportunities"
      />
    </FormControl>
  );
}

export default RemoteOrOnSiteFilter;
