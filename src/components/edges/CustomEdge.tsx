import {
    BaseEdge,
    EdgeLabelRenderer,
    type EdgeProps,
    getBezierPath,
    useReactFlow,
} from '@xyflow/react';
import { X } from 'lucide-react';

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) {

    const { setEdges } = useReactFlow();

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const onEdgeClick = () => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    };

    return (
        <>
            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={style}
                className="stroke-[3px] stroke-slate-600 hover:stroke-violet-500 transition-colors duration-300"
            />

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <button
                        className="w-6 h-6 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500 hover:bg-slate-800 transition-all shadow-md group"
                        onClick={onEdgeClick}
                        aria-label="Delete Edge"
                    >
                        <X size={12} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
