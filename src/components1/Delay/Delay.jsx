import React, { useState, useEffect, useCallback } from "react";
import { Handle,Position, useUpdateNodeInternals } from "reactflow";
import NodeHeader from "../NodeHeader/NodeHeader";
import globalStyles from "../Node.module.css";
import styles from "./Delay.module.css";

import axios from "axios"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import { borderRadius, flexbox } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from '@mui/icons-material/Timer';


const Delay = ({ data, id, type, value }) => {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("");
  const [emailSent, setEmailSent] = useState("");
  const[formData , setFormData] = useState([]);


  const handleChange = (event) => {
    setDay(event.target.value);
  };
  const handleChangeMergeFields = (event) => {
    setEmailSent(event.target.value);
  };

  const handleDoubleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
      setOpen(false);
  };

  const handleSave = (formData) => {
    formData={
      id,
      day,
      emailSent
    }
    axios.post('http://127.0.0.1:3000/workflow/add', formData).then
    ((res) => {console.log(res)
    })
    handleClose();
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/workflow/list')
    .then((res) => {
console.log(res)
setFormData(res.data)
    })
 
  },[])




  return (

    <>
    <div className={globalStyles.node}>
      <div className={styles.delayNode} onClick={handleDoubleClickOpen}>
        <Handle
          id={`${id}`}
          type="target"
          position={Position.Top}
          className={`${styles.handle}`}
          isConnectable
        />
        <div className={styles.header}>
          <div className={styles.labelContainer}>
          <TimerIcon sx={{width:20,height:20,ml:1}}/>
            <h6 id={id} type={type}>
              Delay
            </h6>
          </div>

          <div className={styles.textupdaternodedelay}>
              <p>
                Wait  <b>{day}</b> from the day <b>{emailSent}</b>
              </p>
            </div>
        </div>
        {/* <NodeHeader label={data.internal.name} type={type} id={id} value={value} /> */}
        <Handle
          id={`${id}`}
          type="source"
          position={Position.Bottom}
          className={`${styles.handle}`}
          isConnectable
        />
      </div>
    </div>
    <Dialog
        sx={{ display: "flex", justifyContent: "end"}}
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <div className="DialogBox">
          <DialogTitle sx={{ background: "#fa8600", mb: 3, color: "#fff" }}>
           Delay
            <CloseIcon onClick={handleClose} sx={{ ml: 20 }} />
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <FormControl sx={{ mb: 2 }}>
                <Select
                  sx={{ height: 45, width:200 }}
                  value={day}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value={"2 Days"}>
                    2 Days
                  </MenuItem>
                </Select>
              </FormControl>
              <div>
                <FormControl sx={{ mb: 3 }}>
                  Available Merge Fields
                  <Select
                    sx={{ height: 45, width:200 ,mt:1}}
                    value={emailSent}
                    onChange={handleChangeMergeFields}
                    displayEmpty
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value={"email was sent"}>email was sent</MenuItem>
                    <MenuItem value={"email was not sent"}>email was not sent</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Box>
          </DialogContent>
          <Button
            variant="contained"
            onClick={handleSave}
            color="primary"
            sx={{ ml: 3, mb: 3 }}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default Delay;
