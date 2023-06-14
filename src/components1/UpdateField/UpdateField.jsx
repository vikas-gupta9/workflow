import React, { useState, useEffect, useCallback } from "react";
import { Handle,Position, useUpdateNodeInternals } from "reactflow";
import NodeHeader from "../NodeHeader/NodeHeader";
import globalStyles from "../Node.module.css";
import styles from "./UpdateField.module.css";

import axios from "axios"


import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from '@mui/icons-material/Autorenew';



const UpdateField = ({ data, id, type, value }) => {
  // const [nodeValue, setNodeValue] = useState();
  const [open, setOpen] = useState(false);
  const [candidate, setCandidate] = useState("");
  const [candidateReply, setCandidateReply] = useState("");
  const[formData , setFormData] = useState([]);


  const handleChange = (event) => {
    setCandidate(event.target.value);
  };
  const handleChangeMergeFields = (event) => {
    setCandidateReply(event.target.value);
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
      candidate,
      candidateReply
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

  // const onChange = useCallback((evt) => {
  //   setNodeValue(evt.target.value);
  // }, []);
  return (
    <>
    <div className={globalStyles.node}>
      <div className={styles.updateNode} onClick={handleDoubleClickOpen}>
        <Handle
          id={`${id}`}
          type="target"
          position={Position.Top}
          className={`${styles.handle}`}
          isConnectable
        />
        <div className={styles.header}>
          <div className={styles.labelContainer}>
          <AutorenewIcon sx={{width:20, height:20,ml:0.5}}/>
            <h6 id={id} type={type}>
              Update Field
            </h6>
          </div>

          <div className={styles.textupdaternodeupdatefield}>
              <p>
                <b>{candidate}</b> will be changed to <b>{candidateReply}</b>
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
          <DialogTitle sx={{ background: "#ff4d4f", mb: 3, color: "#fff" }}>
           Update Fields
            <CloseIcon onClick={handleClose} sx={{ ml: 10 }} />
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
              <FormControl sx={{ mb: 2}}>
                <Select
                  sx={{ height: 45,width: 200}}
                  value={candidate}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value={"Candidate Status"}>
                    Candidate Status
                  </MenuItem>
                  <MenuItem value={"Candidate Profile"}>
                    Candidate Profile
                  </MenuItem>
                </Select>
              </FormControl>
              <div>
                <FormControl sx={{ mb: 3 }}>
                  Available Merge Fields
                  <Select
                    sx={{ height: 45 , width:200,mt:1}}
                    value={candidateReply}
                    onChange={handleChangeMergeFields}
                    displayEmpty
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value={"Responded"}>Responded</MenuItem>
                    <MenuItem value={"Not Responded"}>Not Responded</MenuItem>
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

export default UpdateField;
