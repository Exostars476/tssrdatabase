import { useState } from 'react'
import './App.css'
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RouterPage from "./pages/Routeur";
import SwitchPage from './pages/Switch';
import LinuxPage from './pages/Linux';

function App() {
  const [page, setPage] = useState("home");
  const { theme, toggleTheme, contrastClass } = useTheme();

  return (
    <>
      <Navbar
        onNavigate={setPage}
        onToggleTheme={toggleTheme}
        theme={theme}
        contrastClass={contrastClass}
      />

      <main>
        {page === "home" && <Home onNavigate={setPage} />}
        {page === "router_page" && (
          <RouterPage
            contrastClass={contrastClass}
            onToggleTheme={toggleTheme}
            theme={theme}
          />
        )}
        {page === "switch_page" && (
          <SwitchPage
            contrastClass={contrastClass}
            onToggleTheme={toggleTheme}
            theme={theme}
          />
        )}
        {page === "linux_commands_page" && (
          <LinuxPage
            contrastClass={contrastClass}
            onToggleTheme={toggleTheme}
            theme={theme}
          />
        )}
        {page === "network_page" && <h1>🌐 Réseaux</h1>}
      </main>
    </>
  )
}

export default App
