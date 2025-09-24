import { useRef } from "react";

export default function Navbar({ onNavigate, onToggleTheme, theme, contrastClass }) {
    const collapseRef = useRef(null);

    const go = (page) => {
        onNavigate?.(page);
        // Fermer le menu mobile si ouvert
        const el = collapseRef.current;
        if (el && typeof window !== "undefined" && window.bootstrap) {
            const inst =
                window.bootstrap.Collapse.getInstance(el) ||
                new window.bootstrap.Collapse(el, { toggle: false });
            inst.hide();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top navbar-bg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#" onClick={(e) => {
                    e.preventDefault();
                    go("home");
                }}>🖥️ TSSR 2025</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Basculer la navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" ref={collapseRef}>
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={() => go("router_page")}>
                                📡 Routeur
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={() => go("switch_page")}>
                                🖧 Switch
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={() => go("linux_commands_page")}>
                                🐧 Linux
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={() => go("network_page")}>
                                🌐 Réseaux
                            </button>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <button
                                id="themeToggleGlobal"
                                className={`btn btn-sm ${contrastClass}`}
                                type="button"
                                title="Basculer le thème"
                                onClick={onToggleTheme}
                            >
                                {theme === "light" ? "🌞" : "🌙"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}