import React, { useState, useEffect, useCallback } from "react";
import { Handle, Position, useNodesState, useStore } from "reactflow";
import axios from "axios"
import NodeHeader from "../NodeHeader/NodeHeader";
import globalStyles from "../Node.module.css";
import styles from "./SendEmail.module.css";
import "../NodeHeader/NodeHeader.module.css";

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
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";

const SendEmail = ({ id, type }) => {
  const [open, setOpen] = useState(false);
    const [templateType, setTemplateType] = useState("");
    const [mergeFields, setMergeFields] = useState("");
    const[subject, setSubject] = useState("")
    // const[emailContent, setEmailContent] = useState("")
    const[formData , setFormData] = useState([]);
    // const [editID, setEditID] = useState()
    const [prompt, setPrompt] = useState("")
    // const [response, setResponse] = useState("")

    // const handleGptSubmit = (e) => {
    //   e.preventDefault();
    //   axios.post('http://127.0.0.1:3000/workflow/chat', {prompt})
    //   .then((res) => setResponse(res.data))
    //   .catch((error) => {
    //     console.log(error)
    //   })
    // }
  

  const handletemplateTypeChange = (e) => {
    setTemplateType(e.target.value);
  };
  const handlemergeFieldsChange = (e) => {
    setMergeFields(e.target.value);
  };
  const handlesubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleemailContentChange = (e) => {
    setPrompt(e.target.value);
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
      templateType,
      mergeFields,
      subject,
  prompt,

    }
    axios.post('http://127.0.0.1:3000/workflow/add', formData).then
    ((res) => {console.log(res)
    })
    handleClose();
  };

//   const handleUpdate = (id) => {
//         axios.put(`http://127.0.0.1:3000/workflow/${id}`, formData)
//             .then(res => {
//                 setFormData(res);
//             })
//             .catch(err => console.log(err))
// };
//   const handleEdit = (editID) => {
//     axios.get(`http://127.0.0.1:3000/workflow/${editID}`)
//         .then(res => {
//             setFormData(res.data)

//         })
//         .catch(err => console.log(err))
// };


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
        <div className={styles.emailNode} onClick={handleDoubleClickOpen} >
          <Handle
            id={`${id}`}
            type="target"
            position={Position.Top}
            className={`${styles.handle}`}
            isConnectable
          />
          <div className={styles.header}>
            <div className={styles.labelContainer}>
              <EmailIcon sx={{ width: 20, height: 20, ml: 1 }} />
              <h6 id={id} type={type}>
                Send Email
              </h6>
            </div>

            <div className={styles.textupdaternodeemail} id={id} type={type}>
              <p>
                Send <b>{templateType}</b> email to 
                <b>{mergeFields}</b>
              </p>
            </div>
          </div>
          {/* <NodeHeader value={entry}  label={data.internal.name} type={type} id={id} /> */}
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
        sx={{ display: "flex", justifyContent: "end" }}
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <div className="DialogBox">
          <DialogTitle sx={{ background: "#00d05e", mb: 3, color: "#fff" }}>
            Send Email
            <CloseIcon onClick={handleClose} sx={{ ml: 30 }} />
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
              <FormControl sx={{ mb: 1, minWidth: 300 }}>
                <Select
                  sx={{ height: 45 }}
                  name="templateType"
                  value={templateType}
                  onChange={handletemplateTypeChange}
                  displayEmpty
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value={"Candidate job match"}>
                    Candidate job match
                  </MenuItem>
                  <MenuItem value={"Candidate Profile"}>
                    Candidate Profile
                  </MenuItem>
                  <MenuItem value={"Candidate Select"}>
                    Candidate Select
                  </MenuItem>
                  <MenuItem value={"Candidate Rejected"}>
                    Candidate Rejected
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="standard-basic"
                label="Subject"
                variant="standard"
                type="text"
                sx={{ mb: 2 }}
                name="subject"
                value={subject}
                onChange={handlesubjectChange}
              />

              <div>
                <FormControl sx={{ mb: 3, minWidth: 300 }}>
                  Available Merge Fields
                  <Select
                    sx={{ height: 45 }}
                    name="mergeFields"
                    value={mergeFields}
                    onChange={handlemergeFieldsChange}
                    displayEmpty
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value={"Candidate Name"}>Candidate Name</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ mt: 3.5, ml: 2 }}
                >
                  Add
                </Button>
              </div>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Email Content"
                name="emailContent"
                value={prompt}
                onChange={handleemailContentChange}
              />
              {/* <p>hello {response}</p> */}
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
          {/* onClick={handleGptSubmit} */}
          <Button sx={{ ml: 30, mb: 3 }}>
            <img width={50} height={50} alt="" src="./images/chatgpt.png" />
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default SendEmail;
