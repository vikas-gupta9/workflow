import React from 'react'
import { Handle, Position } from "reactflow";
import styles from "./YesNode.module.css";
import globalStyles from "../Node.module.css";
import axios from "axios"

const NoNode = ({id, type}) => {
  const YesAction = "Yes"

  const handleCapture = (formData) => {
    formData={
      id,
      YesAction
    }
    axios.post('http://127.0.0.1:3000/workflow/add', formData).then
    ((res) => {console.log(res)
    })
  }

  return (
   <>
    <div className={globalStyles.node}>
      <div className={styles.NoNode} onClickCapture={handleCapture}>
        <Handle
          id={`${id}`}
          type="source"
          position={Position.Left}
          className={`${styles.handle}`}
          isConnectable
        />
          <div className={styles.labelContainer} >
            <h6 id={id} type={type}>
           {YesAction}
            </h6>
        </div>
        <Handle
            id={`${id}`}
            type="target"
            position={Position.Right}
            className={`${styles.handle}`}
            isConnectable
          />
      </div>
    </div>
   </>
  );
};

export default NoNode