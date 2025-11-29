import { useState, useEffect } from 'react';
import { Play, RotateCcw, Save, Trash2 } from 'lucide-react';
import WorkflowCanvas from './components/WorkflowCanvas';
import Sidebar from './components/Sidebar';
import SettingsPanel from './components/SettingsPanel';
import { useFlowStore } from './store/flowStore';
import { toast, Toaster } from 'sonner';


const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function App() {
  const { nodes, edges, updateNodeData, saveWorkflow, loadWorkflow, variables, setVariable, clearCanvas } = useFlowStore();
  const [isRunning, setIsRunning] = useState(false);


  useEffect(() => {
    loadWorkflow();
  }, []);


  const runWorkflow = async () => {
    if (isRunning) return;
    setIsRunning(true);

    const startNode = nodes.find((n) => n.type === 'start');
    if (!startNode) {
      toast.warning("Please add a 'Start Trigger' node first!");
      setIsRunning(false);
      return;
    }

    let currentNodeId: string | null = startNode.id;

    while (currentNodeId) {
      const currentNode = nodes.find((n) => n.id === currentNodeId);
      if (!currentNode) break;


      updateNodeData(currentNodeId, { status: 'running' });


      // --- NODE EXECUTION LOGIC ---

      // 1. Wait Node
      if (currentNode.type === 'wait') {
        const duration = (parseInt(currentNode.data.duration as string) || 2) * 1000;
        await sleep(duration);
      }
      // 2. Script Node
      else if (currentNode.type === 'script') {
        try {
          const code = currentNode.data.code as string;
          if (code) {
            // Create a safe function execution environment
            // We pass 'variables' and 'setVariable' to the script context
            const scriptFn = new Function('variables', 'setVariable', code);
            scriptFn(variables, setVariable);
            toast.success(`Executed Script Node`);
          }
        } catch (error) {
          console.error("Script Execution Error:", error);
          toast.error(`Script Error: ${error}`);
          updateNodeData(currentNodeId, { status: 'error' });
          setIsRunning(false);
          return;
        }
        await sleep(500); // Small delay for visual effect
      }
      // 3. Email Node (Simulation)
      else if (currentNode.type === 'email') {
        const { email, subject } = currentNode.data;
        console.log(`Sending email to ${email} with subject: ${subject}`);
        await sleep(1000); // Simulate sending time
      }
      else {
        // Default delay for other nodes
        await sleep(1000);
      }


      updateNodeData(currentNodeId, { status: 'completed' });

      let outgoingEdge;

      // --- NAVIGATION LOGIC ---

      if (currentNode.type === 'condition') {
        const { variable, operator, value } = currentNode.data;
        const variableValue = variables[variable as string];
        const compareValue = value; // In a real app, you might want to parse this (number vs string)

        let conditionResult = false;

        // Simple comparison logic
        // Note: This is a basic implementation. For production, use a proper expression parser.
        // We compare loosely (==) to handle string/number differences from inputs
        switch (operator) {
          case '==': conditionResult = variableValue == compareValue; break;
          case '!=': conditionResult = variableValue != compareValue; break;
          case '>': conditionResult = Number(variableValue) > Number(compareValue); break;
          case '<': conditionResult = Number(variableValue) < Number(compareValue); break;
          case '>=': conditionResult = Number(variableValue) >= Number(compareValue); break;
          case '<=': conditionResult = Number(variableValue) <= Number(compareValue); break;
          default: conditionResult = false;
        }

        console.log(`Condition: ${variableValue} ${operator} ${compareValue} = ${conditionResult}`);
        toast.info(conditionResult ? "✅ Condition Passed (YES)" : "❌ Condition Failed (NO)");


        outgoingEdge = edges.find((edge) =>
          edge.source === currentNodeId &&
          edge.sourceHandle === (conditionResult ? 'true' : 'false')
        );

      } else {
        // Standard single output
        outgoingEdge = edges.find((edge) => edge.source === currentNodeId);
      }


      if (outgoingEdge) {
        currentNodeId = outgoingEdge.target;
      } else {
        currentNodeId = null;
      }
    }

    setIsRunning(false);
    toast.success("Workflow execution finished!");
  };

  const resetWorkflow = () => {
    nodes.forEach(node => {
      updateNodeData(node.id, { status: 'idle' });
    });
    toast.info("Status reset");
  };

  const handleSave = () => {
    saveWorkflow();

    toast.success("Workflow Saved Successfully! 💾");
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the entire canvas? This action cannot be undone.")) {
      clearCanvas();
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-950 flex flex-col">
      <Toaster position="top-center" richColors />

      <header className="h-14 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-6 shrink-0 z-30">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
          ProFlow Builder
        </h1>

        <div className="flex items-center gap-2">

          <button
            onClick={handleClear}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
            title="Clear Canvas"
          >
            <Trash2 size={18} />
          </button>

          <button
            onClick={handleSave}
            className="p-2 text-slate-400 hover:text-violet-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-violet-500/30"
            title="Save Workflow"
          >
            <Save size={18} />
          </button>

          <div className="w-px h-6 bg-slate-800 mx-2" />


          <button
            onClick={resetWorkflow}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset Status"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={runWorkflow}
            disabled={isRunning}
            className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                    ${isRunning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
              }
                `}
          >
            <Play size={16} className={isRunning ? "" : "fill-current"} />
            {isRunning ? 'Running...' : 'Run Workflow'}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative h-full">
        <Sidebar />
        <div className="flex-1 relative h-full">
          <WorkflowCanvas />
          <SettingsPanel />
        </div>
      </main>

    </div>
  );
}

export default App;