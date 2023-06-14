import React from "react";
import { Handle,Position } from "reactflow";
import NodeHeader from "../NodeHeader/NodeHeader";
import globalStyles from "../Node.module.css";
import styles from "./Action.module.css";
import { useCallback, useState,useEffect } from "react";

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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Action = ({ data, id, type }) => {
  const [open, setOpen] = useState(false);
  const [actionReply, setActionReply] = useState("");
  const[formData , setFormData] = useState([]);


  const handleChange = (event) => {
    setActionReply(event.target.value);
  };

  const handleDoubleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleSave = (formData) => {
    formData={
      id,
      actionReply
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
      <div className={styles.actionNode} onClick={handleDoubleClickOpen}>
        <Handle
          id={`${id}`}
          type="target"
          position={Position.Top}
          className={`${styles.handle}`}
          isConnectable
        />
        <div className={styles.header}>
          <div className={styles.labelContainer}>
          <PlayArrowIcon sx={{width:25,height:25}}/>
            <h6 id={id} type={type}>
              Action
            </h6>
          </div>

          <div className={styles.textupdaternodeaction}>
              <p>
                Does the Candidate <b>{actionReply}</b>
              </p>
            </div>
        </div>
        {/* <NodeHeader label={data.internal.name} type={type} id={id} value={value} /> */}
        <Handle
          id={`${id}-true`}
          type="source"
          position={Position.Left}
          className={`${styles.handle} ${styles.true} `}
          isConnectable
        />
        <Handle
          id={`${id}-false`}
          type="source"
          position={Position.Right}
          className={`${styles.handle} ${styles.false} `}
          isConnectable
        />
        {/* <Handle
          id={`${id}`}
          type="source"
          position="right"
          className={`${styles.handle} ${styles.bottom} ${styles.handleRight} `}
          isConnectable
        /> */}
      </div>
    </div>
    <Dialog
        sx={{ display: "flex", justifyContent: "end"}}
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <div className="DialogBox">
          <DialogTitle sx={{ background: "#1455fa", mb: 3, color: "#fff" }}>
            Action
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
              <FormControl sx={{ mb: 1 }}>
                <Select
                  sx={{ height: 45,width: 200 }}
                  value={actionReply}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value={" Reply to email"}>
                    Reply to email
                  </MenuItem>
                  <MenuItem value={" Ignore the email"}>
                   Ignore the email
                  </MenuItem>
                
                </Select>
              </FormControl>
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

export default Action;
