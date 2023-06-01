import React, { useState, useEffect } from 'react'
import { Handle } from 'reactflow'
import NodeHeader from '../NodeHeader/NodeHeader'
import globalStyles from '../Node.module.css'
import styles from './SendEmail.module.css'
import '../NodeHeader/NodeHeader.module.css'



import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const SendEmail = ({ data, id, type }) => {
  const [open, setOpen] = useState(false); 
  const [entry, setEntry] = useState('');

const handleChange = (event) => {
  setEntry(event.target.value);
};

const handleDoubleClickOpen = () => {
    setOpen(true);
  };

const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }

}

  return (
    <>
    <div className={globalStyles.node}>
      <div className={styles.emailNode} onDoubleClick={handleDoubleClickOpen}>
        <Handle
          id={`${id}`}
          type="target"
          position="left"
          className={`${styles.handle} ${styles.handleLeft}`}
          isConnectable
        />
        <NodeHeader value={entry}  label={data.internal.name} type={type} id={id} />
        <Handle
          id={`${id}`}
          type="source"
          position="right"
          className={`${styles.handle} ${styles.handleRight}`}
          isConnectable
        />
      </div>
    </div>
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
    </>
  )
}

export default SendEmail
