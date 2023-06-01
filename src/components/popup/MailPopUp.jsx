import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const MailPopUp = () => {
    const [open, setOpen] = useState(false); 
  const [entry, setEntry] = useState('');

const handleChange = (event) => {
  setEntry(event.target.value);
};

const handleClickOpen = () => {
    setOpen(true);
  };

const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }

}
  return (
    <Dialog sx={{display: 'flex', justifyContent:'end'}} disableEscapeKeyDown open={open} onClose={handleClose} >
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <FormControl sx={{ m: 1, minWidth: 80, }}>
        <Select
        sx={{height:45}}
          value={entry}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value=''>
          Candidate job match
          </MenuItem>
          <MenuItem value={'Candidate Profile'}>Candidate Profile</MenuItem>
          <MenuItem value={'Candidate Select'}>Candidate Select</MenuItem>
          <MenuItem value={'Candidate Rejected'}>Candidate Rejected</MenuItem>
        </Select>
      </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
  )
}

export default MailPopUp