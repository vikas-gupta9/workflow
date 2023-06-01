
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { saveAs } from 'file-saver';

import SendEmail from '../SendEmail/SendEmail'
import Action from '../Action/Action'
import UpdateField from '../UpdateField/UpdateField'
import StartNode from '../StartNode/StartNode'
import Sidebar from '../Sidebar/Sidebar'
import Delay from '../Delay/Delay';
import NodeHeader from '../NodeHeader/NodeHeader';
import '../NodeHeader/text-updater-node.css';

import styles from './Workflow.module.css'
import '../react-flow-styles.css'

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  useReactFlow,
  Panel,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: 'node_0',
      type: 'startNode',
      name: 'Start',
      position:{ x: 250, y: 5 },
      data: { internal: { name: 'Start' }, },
      selectable: true,
      draggable: true,
  },
];

let id = 1;
const getId = () => `node_${id++}`;

const nodeTypes={ nodeHeader:NodeHeader, action: Action, updateField: UpdateField, startNode: StartNode, sendEmail: SendEmail, delay:Delay }

const Workflow1 = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const [files, setFiles] = useState("");


  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, type: 'straight', markerEnd: { type: MarkerType.ArrowClosed } }, eds)), []);

const exportNodes = useCallback(() => {
  const flow = reactFlowInstance.toObject();
  const nodesJson = JSON.stringify(flow); // Convert array of nodes to JSON

  const file = new File([nodesJson], 'nodes.json', { // Create file with JSON data
    type: 'application/json;charset=utf-8'
  });
  saveAs(file);
}, [reactFlowInstance])

//import-----------------------------------------------------------


const handleFile = useCallback((e) => {

    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      const filedata = e.target.result;
    
    setFiles(e.target.result);
    const restoreFlow = async () => {
      const flow = JSON.parse(filedata);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
    };
}, [setNodes, setViewport]);



  
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const node = JSON.parse(event.dataTransfer.getData('application/reactflow'))
      const nodeContent = event.dataTransfer.getData("content");
      const { type, name } = node

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNodeId = getId()
      const newNode = {
        id: newNodeId,
        type,
        name,
        position,
        data: {
          internal: {  name: `${name}` },
          action_type: name.replace(/\s+/g, '_').toLowerCase(),
          content: nodeContent,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  
 
  
  return (
    <div className={styles.workflow} style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
      <Sidebar />
      
        <div className={styles.workflowWrapper} ref={reactFlowWrapper}>
         <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          
          >
           <Panel position="top-left">
           <button onClick={exportNodes}>save</button>
        <input  type="file" name="file" onChange={handleFile}/>
           </Panel>
      <Background />
          </ReactFlow>
        </div>
        
      </ReactFlowProvider>
    </div>
  );
};

export default Workflow1;
