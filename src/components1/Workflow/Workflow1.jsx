import React, { useState, useRef, useCallback, useEffect } from "react";
import { saveAs } from "file-saver";

import SendEmail from "../SendEmail/SendEmail";
import Action from "../Action/Action";
import UpdateField from "../UpdateField/UpdateField";
import StartNode from "../StartNode/StartNode";
import Sidebar from "../Sidebar/Sidebar";
import Delay from "../Delay/Delay";
import NoNode from "../No/NoNode";
import YesNode from "../Yes/YesNode";
import NodeHeader from "../NodeHeader/NodeHeader";
import "../NodeHeader/text-updater-node.css";

import axios from "axios"



import styles from "./Workflow.module.css";
import "../react-flow-styles.css";

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  useReactFlow,
  Panel,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Dialog, DialogTitle } from "@mui/material";

const initialNodes = [
  {
    id: "node_0",
    type: "startNode",
    name: "Start",
    position: { x: 250, y: 50 },
    data: { internal: { name: "Start" } },
    selectable: true,
    draggable: true,
  },
];

let id = 1;
const getId = () => `node_${id++}`;

const nodeTypes = {
  action: Action,
  updateField: UpdateField,
  startNode: StartNode,
  sendEmail: SendEmail,
  delay: Delay,
  yes: YesNode,
  no: NoNode,
};

const Workflow1 = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes ] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const [files, setFiles] = useState("");
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [hasLoop, setHasLoop] = useState(false);
  const [nodeData, setNodeData] = useState(null);
  const [jsonData, setJsonData] = useState('');


  const maxNodes = 11;
  

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );
  // useEffect(() => {
  //   setNodes((nds) =>
  //     nds.map((node) => {
  //       if (node.id === '1') {
  //         node.data = {
  //           ...node.data,
  //           value:" "
  //         };
  //       }
  //       return node;
  //     })
  //   );
  // }, [setNodes]);

  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );

  const onConnect = useCallback((params) => {

    const { source, target } = params;

    //check if the maximum node limit has been reached
    if(nodes.length>=maxNodes){
      return alert("Max Node Limitation Reached")
    }

     // Check if the target node is already visited
     if (visitedNodes.includes(target)) {
      setHasLoop(true);
      return;
    }

  // Update the visited nodes state
  setVisitedNodes((prevVisitedNodes) => [...prevVisitedNodes, target]);

    // Reset the hasLoop state
    setHasLoop(false);

     // Add the new edge to the elements array
     const newElements = addEdge({...params,markerEnd: { type: MarkerType.ArrowClosed }}, edges);
    // Update the elements state
    setEdges(newElements);
  
      // Reset the hasLoop state
      setHasLoop(false);
      [];
  });
 

  // const receiveData = (data) => {
  //   setJsonData(JSON.stringify(data));
  // };
  //------------------------------------

  //export----------------------------------------------------------
  const exportNodes = useCallback(() => {
    const flow = reactFlowInstance.toObject();
    // const exportNodeId = getId();
    // flow.nodeContent = {id: exportNodeId};
    // console.log(flow)
    const nodesJson = JSON.stringify(flow);
     // Convert array of nodes to JSON
    const file = new File([nodesJson], "nodes.json", {
      // Create file with JSON data
      type: "application/json;charset=utf-8",
    });
    saveAs(file);
  }, [reactFlowInstance]);
 

  //import-----------------------------------------------------------


  const handleFile = useCallback(
    (e) => {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
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
//       axios.get('http://127.0.0.1:3000/workflow/list')
//     .then((res) => {
// console.log(res)

//     })
 
    },

    [setNodes, setViewport]

  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const node = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      const label = event.dataTransfer.getData("content");

      // const nodeContent = event.dataTransfer.getData("content");
      const { type, name} = node;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNodeId = getId();
      const newNode = {
        id: newNodeId,
        type,
        name,
        position,
        data: {
          internal: { type: `${type}` },
         value:'',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
   
  );
  

  return (
    <div
      className={styles.workflow}
      style={{ width: "100vw", height: "100vh" }}
    >
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
          
          >
            <Panel position="top-right">
              <button onClick={exportNodes}>save</button>
              <input type="file" name="file"  onChange={handleFile}/>
            </Panel>
            <Background />
     
          </ReactFlow>
        </div>
       
      </ReactFlowProvider>

    </div>
  );
};

export default Workflow1;
