import { useState } from 'react'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RouterPage from "./pages/Routeur";
import useTheme from "./hooks/useTheme";
import './App.css'

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
        {page === "switch_page" && <h1>🖧 Switch</h1>}
        {page === "linux_commands_page" && <h1>🐧 Linux</h1>}
        {page === "network_page" && <h1>🌐 Réseaux</h1>}
      </main>
    </>
  )
}

export default App
