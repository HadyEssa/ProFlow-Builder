import { Mail, Type, Clock, GitFork, Code2, Database } from 'lucide-react';
import { useFlowStore } from '../store/flowStore';

export default function SettingsPanel() {
    const selectedNode = useFlowStore((state) =>
        state.nodes.find((node) => node.selected)
    );

    // لجلب المتغيرات وعرضها للمستخدم كمساعدة
    const variables = useFlowStore((state) => state.variables);
    const updateNodeData = useFlowStore((state) => state.updateNodeData);

    if (!selectedNode) return null;

    const handleChange = (key: string, value: string) => {
        updateNodeData(selectedNode.id, { [key]: value });
    };

    return (
        <aside className="w-80 bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl absolute right-0 top-0 z-20 overflow-y-auto">

            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900 sticky top-0">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                    <h2 className="font-semibold text-slate-100">Properties</h2>
                </div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider px-2 py-1 bg-slate-800 rounded">
                    {selectedNode.type}
                </div>
            </div>

            <div className="p-4 space-y-6">

                {/* General Settings */}
                <div className="space-y-3">
                    <label className="text-xs font-medium text-slate-400 uppercase">General</label>
                    <div className="space-y-1">
                        <label className="text-xs text-slate-500 flex items-center gap-1">
                            <Type size={12} /> Label Name
                        </label>
                        <input
                            type="text"
                            value={selectedNode.data.label as string || ''}
                            onChange={(e) => handleChange('label', e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        />
                    </div>
                </div>

                <div className="h-px bg-slate-800" />

                {/* --- Condition Node Settings --- */}
                {selectedNode.type === 'condition' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <label className="text-xs font-medium text-blue-400 uppercase flex items-center gap-2">
                            <GitFork size={14} /> Logic Condition
                        </label>

                        {/* 1. Variable Name */}
                        <div className="space-y-1">
                            <label className="text-xs text-slate-500">Variable Key</label>
                            <input
                                type="text"
                                placeholder="e.g. cart_total"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                onChange={(e) => handleChange('variable', e.target.value)}
                                value={(selectedNode.data.variable as string) || ''}
                            />
                            <div className="text-[10px] text-slate-600">Available: {Object.keys(variables).join(', ')}</div>
                        </div>

                        {/* 2. Operator */}
                        <div className="space-y-1">
                            <label className="text-xs text-slate-500">Operator</label>
                            <select
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                onChange={(e) => handleChange('operator', e.target.value)}
                                value={(selectedNode.data.operator as string) || '=='}
                            >
                                <option value="==">Equals (==)</option>
                                <option value="!=">Not Equals (!=)</option>
                                <option value=">">Greater Than (&gt;)</option>
                                <option value="<">Less Than (&lt;)</option>
                                <option value=">=">Greater or Equal (&gt;=)</option>
                                <option value="<=">Less or Equal (&lt;=)</option>
                            </select>
                        </div>

                        {/* 3. Value */}
                        <div className="space-y-1">
                            <label className="text-xs text-slate-500">Comparison Value</label>
                            <input
                                type="text"
                                placeholder="e.g. 1000"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                onChange={(e) => handleChange('value', e.target.value)}
                                value={(selectedNode.data.value as string) || ''}
                            />
                        </div>
                    </div>
                )}

                {/* --- Script Node Settings --- */}
                {selectedNode.type === 'script' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <label className="text-xs font-medium text-pink-400 uppercase flex items-center gap-2">
                            <Code2 size={14} /> JavaScript Code
                        </label>

                        <div className="space-y-1">
                            <label className="text-xs text-slate-500">Execute Code</label>
                            <textarea
                                rows={8}
                                placeholder="// You can use 'variables' and 'setVariable' here.&#10;console.log('Current score:', variables.score);&#10;setVariable('score', variables.score + 10);"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 resize-none"
                                onChange={(e) => handleChange('code', e.target.value)}
                                value={(selectedNode.data.code as string) || ''}
                            />
                            <div className="text-[10px] text-slate-500 leading-relaxed">
                                <span className="text-slate-300 font-bold">Tips:</span> Access data via <code className="bg-slate-800 px-1 rounded">variables</code>. Update data via <code className="bg-slate-800 px-1 rounded">setVariable('key', val)</code>.
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Email Settings --- */}
                {selectedNode.type === 'email' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <label className="text-xs font-medium text-violet-400 uppercase flex items-center gap-2">
                            <Mail size={14} /> Email Configuration
                        </label>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-500">To</label>
                            <input
                                type="email"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                onChange={(e) => handleChange('email', e.target.value)}
                                value={(selectedNode.data.email as string) || ''}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-500">Subject</label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                onChange={(e) => handleChange('subject', e.target.value)}
                                value={(selectedNode.data.subject as string) || ''}
                            />
                        </div>
                    </div>
                )}

                {/* --- Wait Settings --- */}
                {selectedNode.type === 'wait' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <label className="text-xs font-medium text-amber-400 uppercase flex items-center gap-2">
                            <Clock size={14} /> Timer Settings
                        </label>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-500">Duration (Seconds)</label>
                            <input
                                type="number" min="1"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                onChange={(e) => handleChange('duration', e.target.value)}
                                value={(selectedNode.data.duration as string) || ''}
                            />
                        </div>
                    </div>
                )}

                {/* Helper for Start/End */}
                {(selectedNode.type === 'start') && (
                    <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800 text-xs text-slate-500">
                        <div className="flex items-center gap-2 mb-2 text-slate-300 font-bold">
                            <Database size={14} /> Global Variables:
                        </div>
                        <pre className="font-mono text-[10px] text-green-400 bg-slate-950 p-2 rounded overflow-x-auto">
                            {JSON.stringify(variables, null, 2)}
                        </pre>
                    </div>
                )}

            </div>
        </aside>
    );
}