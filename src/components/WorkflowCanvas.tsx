import { Background, Controls, ReactFlow, ReactFlowProvider, MiniMap, useReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useFlowStore } from "../store/flowStore"
import { useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import CustomNode from './nodes/CustomNode';
import CustomEdge from './edges/CustomEdge';
import ConditionNode from './nodes/ConditionNode'


const nodeTypes = {
    email: CustomNode,
    wait: CustomNode,
    start: CustomNode,
    script: CustomNode,
    condition: ConditionNode,
};

const edgeTypes = {
    default: CustomEdge,
};

function Flow() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useFlowStore();

    const { screenToFlowPosition } = useReactFlow();

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        const type = event.dataTransfer.getData('application/reactflow');

        if (!type) return;

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY
        });

        const newNode = {
            id: uuidv4(),
            type,
            position,
            data: { label: `${type} Node` }
        };

        addNode(newNode);
    }, [screenToFlowPosition, addNode]);

    const defaultEdgeOptions = {
        animated: true,
        type: 'default',
    };
    return (
        <div className="w-full h-full bg-slate-900">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDragOver={onDragOver}
                onDrop={onDrop}
                fitView
                colorMode="dark"
            >
                <Background gap={12} size={1} />
                <Controls />
                <MiniMap
                    nodeStrokeColor={(n) => {
                        if (n.type === 'start') return '#10b981';
                        if (n.type === 'email') return '#8b5cf6';
                        if (n.type === 'wait') return '#f59e0b';
                        return '#64748b';
                    }}
                    nodeColor="#1e293b"
                    maskColor="rgba(0, 0, 0, 0.7)"
                    className="!bg-slate-900 border border-slate-800 rounded-lg shadow-xl"
                />
            </ReactFlow>
        </div>
    );
}

export default function WorkflowCanvas() {
    return (
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    );
}