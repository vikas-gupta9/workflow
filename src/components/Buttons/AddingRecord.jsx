import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ButtonGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';



export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [importrecord, setImportRecord] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickimportrecord = () => {
    setImportRecord(true);
  }

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
   
  };
  const handleImportClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setImportRecord(false);
    }
   
  };

 

  return (
 <>
 
 <ButtonGroup  sx={{ height:45}} className="m-1" variant="outlined" color="inherit" aria-label="contained button group" m-1>
      <Button onClick={handleClickOpen}>+ Add</Button>
      <Button onClick={handleClickimportrecord}>...</Button>
</ButtonGroup>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add Record</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField id="outlined-basic" label="Name" variant="outlined" />
              
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField id="outlined-basic" label="Company" variant="outlined" />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>

      <Dialog disableEscapeKeyDown open={importrecord} onClose={handleImportClose}>
        <DialogTitle>
            <Button variant="contained" color="primary"> <AddCircleOutlineOutlinedIcon/>Import</Button>
            </DialogTitle>
        <DialogContent>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImportClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

 </>
  );
}