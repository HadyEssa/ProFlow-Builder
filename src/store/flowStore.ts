import { create } from 'zustand';
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    type Edge,
    type OnNodesChange,
    type OnEdgesChange,
    type OnConnect,
    type Connection,
} from '@xyflow/react';
import { toast } from 'sonner';
import { hasCycle } from '../lib/utils';
import type { AppNode } from '../types/workFlow';

const LOCAL_STORAGE_KEY = "proflow-workflow";

interface FlowState {
    nodes: AppNode[];
    edges: Edge[];
    // --- الجديد: المتغيرات العامة ---
    variables: Record<string, any>;

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addNode: (node: AppNode) => void;
    updateNodeData: (id: string, data: any) => void;
    deleteNode: (id: string) => void;
    clearCanvas: () => void;
    saveWorkflow: () => void;
    loadWorkflow: () => void;
    // --- الجديد: دالة تعديل المتغيرات ---
    setVariable: (key: string, value: any) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
    nodes: [],
    edges: [],
    // بيانات وهمية للبداية (Mock Database)
    variables: {
        "score": 10,
        "cart_total": 500,
        "is_vip": true,
        "user_name": "Ahmed"
    },

    onNodesChange: (changes) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) as AppNode[] });
    },

    onEdgesChange: (changes) => {
        set({ edges: applyEdgeChanges(changes, get().edges) });
    },

    onConnect: (connection: Connection) => {
        const { nodes, edges } = get();
        const target = nodes.find((n) => n.id === connection.target);
        const source = nodes.find((n) => n.id === connection.source);

        if (!target || !source) return;

        const isCycle = hasCycle(target, source.id, nodes, edges);
        if (isCycle) {
            toast.error("Infinite Loop Detected! Connection rejected.");
            return;
        }
        if (connection.source === connection.target) return;

        set({ edges: addEdge(connection, get().edges) });
    },

    addNode: (node) => {
        set({ nodes: [...get().nodes, node] });
    },

    updateNodeData: (id, data) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === id) {
                    return { ...node, data: { ...node.data, ...data } };
                }
                return node;
            }),
        });
    },

    deleteNode: (id) => {
        set({
            nodes: get().nodes.filter((node) => node.id !== id),
            edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
        });
    },

    clearCanvas: () => {
        set({ nodes: [], edges: [] });
        toast.success("Canvas cleared successfully");
    },

    // --- الجديد: دالة تحديث المتغيرات ---
    setVariable: (key, value) => {
        set((state) => ({
            variables: { ...state.variables, [key]: value }
        }));
        // طباعة في الكونسول للمتابعة
        console.log(`🔄 Variable Updated: ${key} =`, value);
    },

    saveWorkflow: () => {
        const { nodes, edges } = get();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ nodes, edges }));
        console.log("Saved to LocalStorage:", { nodes, edges });
    },

    loadWorkflow: () => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                if (parsedData) {
                    set({
                        nodes: parsedData.nodes || [],
                        edges: parsedData.edges || []
                    });
                    console.log("Loaded from LocalStorage successfully");
                }
            } catch (error) {
                console.error("Failed to load workflow:", error);
            }
        } else {
            console.log("No saved workflow found");
        }
    },
}));