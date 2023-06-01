import React from 'react'
import { Handle } from 'reactflow'
import NodeHeader from '../NodeHeader/NodeHeader'
import globalStyles from '../Node.module.css'
import styles from './Action.module.css'

const Action = ({ data, id, type, value }) => {
  return (
    <div className={globalStyles.node}>
      <div className={styles.actionNode}>
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
          className={`${styles.handle} ${styles.true} ${styles.handleRight} `}
          isConnectable
        />
        <Handle
          id={`${id}-false`}
          type="source"
          position="right"
          className={`${styles.handle} ${styles.false} ${styles.handleRight} `}
          isConnectable
        />
         <Handle
          id={`${id}`}
          type="source"
          position="right"
          className={`${styles.handle} ${styles.bottom} ${styles.handleRight} `}
          isConnectable
        />
      </div>
    </div>
  )
}

export default Action
