import { memo, useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { GitFork, MoreHorizontal, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useFlowStore } from '../../store/flowStore';

const ConditionNode = ({ id, data, selected }: NodeProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const deleteNode = useFlowStore((state) => state.deleteNode);

    return (
        <div
            className={cn(
                "min-w-[200px] rounded-xl border-2 bg-slate-900 shadow-xl transition-all duration-200 relative group",
                "hover:shadow-2xl hover:scale-[1.02]",
                selected ? "border-blue-400 ring-2 ring-blue-500/50" : "border-slate-800"
            )}
        >

            <Handle
                type="target"
                position={Position.Top}
                className="!w-3 !h-3 !bg-slate-400 !border-2 !border-slate-900"
            />

            <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/50">
                        <GitFork size={16} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-100 leading-none">
                            Check Condition
                        </h3>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                            IF / ELSE
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

                {/* عرض الشرط (اختياري) */}
                <div className="px-2 py-1 bg-slate-950 rounded border border-slate-800 text-[10px] text-slate-400 font-mono text-center">
                    {data.conditionLabel as string || "If variable == true"}
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

            {/* --- المخرجان السحريان --- */}

            {/* 1. مخرج الـ TRUE (اليمين أو الأخضر) */}
            <div className="absolute -bottom-3 left-10 flex flex-col items-center">
                <span className="text-[9px] font-bold text-emerald-500 mb-1 bg-slate-900 px-1">YES</span>
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="true" // مهم جداً: معرف المقبض
                    className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-slate-900"
                />
            </div>

            {/* 2. مخرج الـ FALSE (اليسار أو الأحمر) */}
            <div className="absolute -bottom-3 right-10 flex flex-col items-center">
                <span className="text-[9px] font-bold text-red-500 mb-1 bg-slate-900 px-1">NO</span>
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="false" // مهم جداً: معرف المقبض
                    className="!w-3 !h-3 !bg-red-500 !border-2 !border-slate-900"
                />
            </div>

        </div>
    );
};

export default memo(ConditionNode);