import React from "react";
import { Handle, Position } from "reactflow";
// import NodeHeader from "../NodeHeader/NodeHeader";
import globalStyles from "../Node.module.css";
import styles from "./StartNode.module.css";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";

const StartNode = ({data, id, type }) => {
  const [nodeValue, setNodeValue] = useState();

  const onChange = useCallback((evt) => {
    setNodeValue(evt.target.value);
  }, []);

  return (
    <div className={globalStyles.node}>
      <div className={styles.startNode}>
        <div className={styles.header}>
          <div className={styles.labelContainer}>
            <h6 id={id} type={type}>
              Start Node
            </h6>
          </div>
         
            <TextField
            sx={{width:150}}
            size="small"
              placeholder="start Node"
              onChange={onChange}
            />
            {/* <input placeholder="start Node"  onChange={onChange} /> */}
        
        </div>
        <Handle
          id={`${id}`}
          type="source"
          position={Position.Bottom}
          className={styles.handle}
          isConnectable
        />
      </div>
    </div>
  );
};

export default StartNode;
