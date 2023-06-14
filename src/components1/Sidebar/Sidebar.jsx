import React from 'react'
import styles from './Sidebar.module.css'
import actionStyle from '../SendEmail/SendEmail.module.css'
import logicStyle from '../Action/Action.module.css'
import outputStyle from '../UpdateField/UpdateField.module.css'


const onDragStart = (event, node,content) => {
  const stringNode = JSON.stringify(node)
  event.dataTransfer.setData('application/reactflow', stringNode)
  event.dataTransfer.setData("content", content);
  event.dataTransfer.effectAllowed = 'move'
}

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
    
    <div className={styles.sidebarnodes}>
    </div>
      <section className={styles.emailNodes}>
        <div
          className={`${styles.emailNode} ${actionStyle.emailNode} `}
          onDragStart={(event) => onDragStart(event, { type: 'sendEmail', name: 'Send Email' })}
          draggable
        >
          Send Email
        </div>
      </section>
      <section className={styles.updateNodes}>
        <div
          className={`${styles.updateNode} ${outputStyle.updateNode} `}
          onDragStart={(event) =>
            onDragStart(event, {
              type: 'updateField',
              name: 'Update Field',
            })
          }
          draggable
        >
          Update Field
        </div>
      </section>
      <section className={styles.actionNodes}>
        <div
          className={`${styles.actionNode} ${logicStyle.actionNode} `}
          onDragStart={(event) => onDragStart(event, { type: 'action', name: 'Action' })}
          draggable
        >
          Action
        </div>
      </section>
      <section className={styles.delayNodes}>
        <div
          className={`${styles.delayNode} ${outputStyle.delayNode} `}
          onDragStart={(event) =>
            onDragStart(event, {
              type: 'delay',
              name: 'Delay',
            })
          }
          draggable
        >
          Delay
        </div>
      </section>

      <div  className={styles.YesNo}>
      <section className={styles.YesNodes}>
        <div
          className={`${styles.YesNode} ${actionStyle.YesNode} `}
          onDragStart={(event) => onDragStart(event, { type: 'yes', name: 'Yes' })}
          draggable
        >
       Yes
        </div>
      </section>
      <section className={styles.NoNodes}>
        <div
          className={`${styles.NoNode} ${actionStyle.NoNode} `}
          onDragStart={(event) => onDragStart(event, { type: 'no', name: 'No' })}
          draggable
        >
         No
        </div>
      </section>
      </div>
     
     
    </aside>
  )
}

export default Sidebar
