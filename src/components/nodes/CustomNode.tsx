import { memo, useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import { Clock, FileText, Layout, MessageSquare, MoreHorizontal, Play, Loader2, CheckCircle, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { useFlowStore } from "../../store/flowStore";


const nodeConfig = {
    start: { icon: Play, color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-500/10' },
    email: { icon: MessageSquare, color: 'text-violet-400', border: 'border-violet-500/50', bg: 'bg-violet-500/10' },
    wait: { icon: Clock, color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-500/10' },
    condition: { icon: Layout, color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-500/10' },
    script: { icon: FileText, color: 'text-pink-400', border: 'border-pink-500/50', bg: 'bg-pink-500/10' },
};

const CustomNode = ({ id, data, selected, type }: NodeProps) => {
    const config = nodeConfig[type as keyof typeof nodeConfig] || nodeConfig.email;
    const Icon = config.icon;
    const [showMenu, setShowMenu] = useState(false);
    const deleteNode = useFlowStore((state) => state.deleteNode);


    const status = data.status as 'idle' | 'running' | 'completed' | 'error' || 'idle';

    return (
        <div className={cn(
            "min-w-[180px] rounded-xl border-2 bg-slate-900 shadow-xl transition-all duration-300 relative group",
            "hover:shadow-2xl hover:scale-[1.02]",


            status === 'running' && "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]",
            status === 'completed' && "border-slate-600 opacity-80",
            status === 'error' && "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]",


            status === 'idle' && (selected ? "border-slate-100 ring-2 ring-violet-500/50" : "border-slate-800")
        )}>

            {type !== "start" && (
                <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-slate-900" />
            )}

            <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center gap-3">


                    <div className={cn("p-2 rounded-lg relative", config.bg, config.color)}>
                        {status === 'running' ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : status === 'completed' ? (
                            <CheckCircle size={16} />
                        ) : (
                            <Icon size={16} />
                        )}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-100 leading-none">
                            {data.label as string}
                        </h3>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                            {status === 'idle' ? type : status}
                        </p>
                    </div>

                    <div className="relative">
                        <button
                            className="text-slate-600 hover:text-slate-300 p-1 rounded hover:bg-slate-800 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu(!showMenu);
                            }}
                        >
                            <MoreHorizontal size={16} />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 top-full mt-2 w-32 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <button
                                    className="w-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNode(id);
                                    }}
                                >
                                    <Trash2 size={12} />
                                    Delete Node
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay to close menu when clicking outside */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                    }}
                />
            )}

            <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-slate-900" />
        </div>
    );
};

export default memo(CustomNode);