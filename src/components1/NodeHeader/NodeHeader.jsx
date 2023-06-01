import React, { useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import styles from './NodeHeader.module.css'
import { useCallback } from 'react';

const NodeHeader = ({ label, type, id,data}) => {
const [nodeValue , setNodeValue] = useState();

  const onChange = useCallback((evt) => {
    setNodeValue(evt.target.value);
  }, []);

  return (
    <>
    <div className={styles.header}>
   
      <div className={styles.labelContainer}>
        {type !== 'startNode' ? <DragIndicatorOutlinedIcon className={styles.draggerIcon} /> : null}
        {label}
      </div>
    
      <div className="text-updater-node">
        <input placeholder={label}  onChange={onChange} />
    </div>
    </div>
   
    </>
  )
}

export default NodeHeader
