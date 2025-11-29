import { ChevronLeft, ChevronRight, Clock, FileText, Layout, MessageSquare, Play } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function Sidebar() {


    const [isCollapsed, setIsCollapsed] = useState(false);

    const onDrageStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside
            className={cn(
                "bg-slate-900 border-r border-slate-800 flex flex-col h-full transition-all duration-300 relative",
                isCollapsed ? "w-[20px]" : "w-64"
            )}>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 z-10 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
            <div className={cn(
                "flex flex-col h-full overflow-hidden transition-opacity duration-300",
                isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
            )}>
                <div className="p-4 border-b border-slate-800">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Toolkit</h2>
                </div>
                <div className="p-4 flex flex-col gap-3">
                    <div className="text-xs text-slate-500 mb-2">
                        Drage these nodes to the canvas
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-lg cursor-grab hover:border-violet-500 hover:bg-slate-750 transition-all"
                        onDragStart={(event) => onDrageStart(event, "email")}
                        draggable
                    >
                        <MessageSquare className="w-5 h-5 text-violet-400" />
                        <span className="text-sm font-medium">Email</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-lg cursor-grab hover:border-violet-500 hover:bg-slate-750 transition-all"
                        onDragStart={(event) => onDrageStart(event, "wait")}
                        draggable
                    >
                        <Clock className="w-5 h-5 text-violet-400" />
                        <span className="text-sm font-medium">wait / Delay</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-lg cursor-grab hover:border-violet-500 hover:bg-slate-750 transition-all"
                        onDragStart={(event) => onDrageStart(event, "condition")}
                        draggable
                    >
                        <Layout className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-medium">Condition</span>
                    </div>
                    <div
                        className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-lg cursor-grab hover:border-emerald-500 hover:bg-slate-750 transition-all"
                        onDragStart={(event) => onDrageStart(event, 'start')}
                        draggable
                    >
                        <Play className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-medium">Start Trigger</span>
                    </div>
                    <div
                        className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-lg cursor-grab hover:border-pink-500 hover:bg-slate-750 transition-all"
                        onDragStart={(event) => onDrageStart(event, 'script')}
                        draggable
                    >
                        <FileText className="w-5 h-5 text-pink-400" />
                        <span className="text-sm font-medium">Custom Script</span>
                    </div>
                </div>
            </div>
        </aside>

    )

}