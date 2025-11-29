# 🚀 ProFlow Builder

**ProFlow Builder** is a powerful, visual workflow automation tool that allows users to design, configure, and execute logic flows directly in the browser. With a drag-and-drop interface, you can create complex automations involving conditions, delays, scripts, and simulated actions.

![ProFlow Builder Screenshot](https://via.placeholder.com/800x400?text=ProFlow+Builder+Preview)

## ✨ Features

- **🎨 Visual Drag-and-Drop Canvas**: Intuitive interface powered by React Flow.
- **🧩 Diverse Node Types**:
  - **Start Trigger**: The entry point of your workflow.
  - **Action Nodes**: Send Emails (simulated), Wait/Delay.
  - **Logic Nodes**: Condition (If/Else) with dynamic variable comparison.
  - **Script Nodes**: Execute custom JavaScript code to manipulate variables.
- **💾 State Management**:
  - **Global Variables**: Define and update variables (e.g., `cart_total`, `score`) that persist throughout the workflow execution.
  - **Local Storage**: Automatically saves your workflow so you never lose progress.
- **⚡ Real-Time Execution Engine**: Run your workflow and watch it execute step-by-step with visual feedback.
- **🛠️ Canvas Tools**:
  - **MiniMap**: Navigate large workflows easily.
  - **Controls**: Zoom, Pan, and Fit to View.
  - **Management**: Delete individual nodes or clear the entire canvas.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/proflow-builder.git
    cd proflow-builder
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Deployment

This project is built with **Vite** and is completely client-side. You can deploy it to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

### Build for Production

To create a production-ready build:

```bash
npm run build
```

This will generate a `dist` folder containing the optimized static files.

### Preview Production Build

To test the production build locally:

```bash
npm run preview
```

## ⚠️ Limitations & Constraints

- **Client-Side Only**: All logic executes in the browser. There is no backend server.
- **Simulation Mode**: Actions like "Send Email" are simulated (logged to console/toast) and do not actually send emails.
- **Session Variables**: Variables are reset when the page is reloaded (unless saved/loaded via the mock store logic).
- **Security**: Since script nodes execute code using `new Function()`, this tool is intended for trusted environments or educational purposes.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Workflow Engine**: [React Flow](https://reactflow.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📄 License

This project is licensed under the MIT License.
