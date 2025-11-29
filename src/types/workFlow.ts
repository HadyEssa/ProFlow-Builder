import type { Edge, Node } from "@xyflow/react"

export type workFlowNode = "start" | "end" | "email" | "condition" | "wait" | "script";

export interface workFlowNodeData extends Record<string, unknown> {
    label: string;
    details?: string;
    status?: "idel" | "running" | "completed" | "error";
    config?: Record<string, any>;

    // Email Node
    email?: string;
    subject?: string;

    // Wait Node
    duration?: string;

    // Condition Node
    variable?: string;
    operator?: string;
    value?: string;

    // Script Node
    code?: string;
}

export type AppNode = Node<workFlowNodeData>;

export type workFlow = {
    id: string,
    name: string,
    nodes: Node[],
    edges: Edge[],
    createdAt: string,
    updatedAt: string
}