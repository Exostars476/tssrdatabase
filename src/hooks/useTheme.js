import { useEffect, useState } from "react";

export default function useTheme() {
  // par défaut: light
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    const hljsDark = document.getElementById("hljs-dark");
    const hljsLight = document.getElementById("hljs-light");

    root.setAttribute("data-bs-theme", theme);
    const light = theme === "light";

    if (hljsLight) hljsLight.disabled = !light;
    if (hljsDark) hljsDark.disabled = light;

    localStorage.setItem("bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("bs-theme");
    if (saved) {
      setTheme(saved);
    } else {
      // 👉 forcer light si pas de choix enregistré
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const contrastClass = theme === "light" ? "btn-outline-dark" : "btn-outline-light";

  return { theme, toggleTheme, contrastClass };
}
