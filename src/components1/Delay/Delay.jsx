import React, { useState, useEffect } from "react";
import { Handle, useUpdateNodeInternals } from "reactflow";
import NodeHeader from "../NodeHeader/NodeHeader";
import globalStyles from "../Node.module.css";
import styles from "./Delay.module.css";

const Delay = ({ data, id, type, value}) => {
  return (
    <div className={globalStyles.node}>
      <div className={styles.delayNode}>
        <Handle
          id={`${id}`}
          type="target"
          position="left"
          className={`${styles.handle} ${styles.handleLeft}`}
          isConnectable
        />
        <NodeHeader label={data.internal.name} type={type} id={id} value={value} />
        <Handle
          id={`${id}-true`}
          type="source"
          position="right"
          className={`${styles.handle} ${styles.handleRight} `}
          isConnectable
        />
        <Handle
          id={`${id}-false`}
          type="source"
          position="right"
          className={`${styles.handle} ${styles.handleRight} `}
          isConnectable
        />
      </div>
    </div>
  );
};

export default Delay;
