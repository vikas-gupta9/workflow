import React from 'react';
import MailPopUp from '../components/popup/MailPopUp';


export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
    <div className="sidebar">
    <div className="dndnode sendemail"  onDragStart={(event) => onDragStart(event, 'Send Email')} draggable>
        Send Email
      </div>
      <div className="dndnode updatefield" onDragStart={(event) => onDragStart(event, 'Update Field')} draggable>
        Update Field
      </div>
      <div className="dndnode action" onDragStart={(event) => onDragStart(event, 'Action')} draggable>
        Action
      </div>
      <div className="dndnode delay" onDragStart={(event) => onDragStart(event, 'Delay')} draggable>
        Delay
      </div>

     <div className="YNbtn">
     <div className="dndnode yes" onDragStart={(event) => onDragStart(event, 'Yes')} draggable>
        Yes
      </div>
      <div className="dndnode no" onDragStart={(event) => onDragStart(event, 'No')} draggable>
        No
      </div>
     </div>
      </div>
     
    </aside>
  );
};
