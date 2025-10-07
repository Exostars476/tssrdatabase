// src/components/PageWithTocAccordion.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Collapse } from "bootstrap";

export default function PageWithTocAccordion({
    title,               // string : titre de la page
    toc,                 // [{ id, label, icon? }]
    items,               // [{ id, title, icon?, content }] -> content = JSX
    accordionId = "notesAccordion",
    enableExpandCollapse = true,
    contrastClass = "btn-outline-light",
    singleOpen = false,
    showFloatingControls = true,
    onToggleTheme,
    theme,
    floatingClassName = "floating-controls btn-group",
}) {
    const accRef = useRef(null);
    const [openIds, setOpenIds] = useState(() => new Set()); // ids ouverts

    // IDs uniques stables pour targets Bootstrap
    const computed = useMemo(() => {
        return items.map((it) => {
            const collapseId = `collapse-${it.id}`;
            const headingId = `heading-${it.id}`;
            return { ...it, collapseId, headingId };
        });
    }, [items]);

    // Boutons "Tout déplier / replier"
    const expandAll = () => {
        if (!accRef.current) return;
        accRef.current
            .querySelectorAll(".accordion-collapse")
            .forEach((el) => new Collapse(el, { toggle: false }).show());
    };
    const collapseAll = () => {
        if (!accRef.current) return;
        accRef.current
            .querySelectorAll(".accordion-collapse.show, .accordion-collapse.collapsing")
            .forEach((el) => new Collapse(el, { toggle: false }).hide());
    };

    // Optionnel : activer le scroll vers un item via ancre #heading-xxx
    useEffect(() => {
        const hash = decodeURIComponent(window.location.hash || "");
        if (!hash) return;
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    const toggleOne = (collapseId) => {
        const el = document.getElementById(collapseId);
        if (!el) return;
        Collapse.getOrCreateInstance(el, { toggle: false }).toggle();
    };

    // écoute les événements Bootstrap pour tenir openIds à jour
    useEffect(() => {
        const root = accRef.current;
        if (!root) return;

        const onShow = (e) => {
            const id = e.target.id;
            setOpenIds(prev => {
                const next = new Set(prev);
                next.add(id);
                return next;
            });
        };
        const onHide = (e) => {
            const id = e.target.id;
            setOpenIds(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        };

        root.addEventListener("show.bs.collapse", onShow);
        root.addEventListener("hide.bs.collapse", onHide);
        return () => {
            root.removeEventListener("show.bs.collapse", onShow);
            root.removeEventListener("hide.bs.collapse", onHide);
        };
    }, []);

    return (
        <section className="page-section mt-6">
            <div className="container">
                <div className="row g-4">
                    {/* Sommaire */}
                    <aside className="col-lg-4 order-lg-1">
                        <div className="position-sticky" style={{ top: "5rem" }}>
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="h4 mb-3">Sommaire</h2>
                                    <nav className="toc small">
                                        {toc.map((t) => (
                                            <div className="mb-2" key={t.id}>
                                                <a href={`#heading-${t.id}`}>{t.icon ? `${t.icon} ` : ""}{t.label}</a>
                                            </div>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Contenu */}
                    <div className="col-lg-8 order-lg-2">
                        <header className="mb-4">
                            <div className="row justify-content-between align-items-center">
                                <div className="col">
                                    <h1 className="h3 mb-0">{title}</h1>
                                </div>
                                {enableExpandCollapse && (
                                    <div className="col-auto text-end">
                                        <button className={`btn btn-sm me-2 ${contrastClass}`} onClick={expandAll}>
                                            Tout déplier
                                        </button>
                                        <button className={`btn btn-sm ${contrastClass}`} onClick={collapseAll}>
                                            Tout replier
                                        </button>
                                    </div>
                                )}
                            </div>
                        </header>

                        <div className="accordion" id={accordionId} ref={accRef}>
                            {computed.map((it) => {
                                const isOpen = openIds.has(it.collapseId);
                                return (
                                    <div className="accordion-item" key={it.id}>
                                        <h2 className="accordion-header" id={it.headingId}>
                                            <button
                                                className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                                                type="button"
                                                onClick={() => toggleOne(it.collapseId)}
                                                aria-expanded="{isOpen}"
                                                aria-controls={it.collapseId}
                                            >
                                                {it.icon ? <span className="me-2">{it.icon}</span> : null}
                                                {it.title}
                                            </button>
                                        </h2>
                                        <div
                                            id={it.collapseId}
                                            className="accordion-collapse collapse"
                                            {...(singleOpen ? { "data-bs-parent": `#${accordionId}` } : {})}
                                        >
                                            <div className="accordion-body">{it.content}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {/* /accordion */}
                    </div>
                </div>
                {showFloatingControls && (
                    <div className={floatingClassName} role="group" aria-label="Actions rapides">
                        <button
                            className={`btn btn-sm ${contrastClass}`}
                            type="button"
                            title="Basculer le thème"
                            aria-label="Basculer le thème"
                            onClick={onToggleTheme}
                        >
                            {theme === "light" ? "🌞" : "🌙"}
                        </button>
                        <button
                            className={`btn btn-sm ${contrastClass}`}
                            type="button"
                            title="Tout déplier"
                            aria-label="Tout déplier"
                            onClick={expandAll}
                        >
                            ＋
                        </button>
                        <button
                            className={`btn btn-sm ${contrastClass}`}
                            type="button"
                            title="Tout replier"
                            aria-label="Tout replier"
                            onClick={collapseAll}
                        >
                            −
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
