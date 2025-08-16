import "./App.css";
import Desktop from "./components/Desktop/Desktop";
import Taskbar from "./components/Taskbar/Taskbar";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme.name}>
      <div className="app-container">
        <Desktop />
        <Taskbar />
      </div>
    </div>
  );
}

export default App;
