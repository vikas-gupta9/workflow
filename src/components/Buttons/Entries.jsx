import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels() {
  const [entry, setEntry] = React.useState('');

  const handleChange = (event) => {
    setEntry(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80, }}>
        <Select
        sx={{height:45}}
          value={entry}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value=''>
            Entries
          </MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}