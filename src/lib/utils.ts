import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Edge, Node } from "@xyflow/react";


export const hasCycle = (currentNode: Node, targetId: string, nodes: Node[], edges: Edge[]): boolean => {
    if (currentNode.id === targetId) {
        return true;
    }

    const parents = edges
        .filter((edge) => edge.target === currentNode.id)
        .map((edge) => nodes.find((n) => n.id === edge.source))
        .filter(Boolean) as Node[];

    return parents.some((parent) => hasCycle(parent, targetId, nodes, edges));
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}