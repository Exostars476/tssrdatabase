import React, { useState } from "react";
import { useEffect, useMemo, useRef } from "react";
import { Tooltip } from "bootstrap";

const BIT_WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];

// AND binaire (4 octets x 8 bits)
function andBits(bitsA, bitsB) {
    return bitsA.map((octA, i) => octA.map((bit, j) => (bit & bitsB[i][j]) >>> 0));
}

// comparaison profonde 4x8
function equalBits(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        const A = a[i], B = b[i];
        if (A.length !== B.length) return false;
        for (let j = 0; j < A.length; j++) if (A[j] !== B[j]) return false;
    }
    return true;
}

/** @typedef {'mask'|'ip'|'network'} RowType */
/** 
 * @typedef {{ 
 *  id: string, 
 *  type: RowType, 
 *  bits: number[][],
 *  dependsOn?: string[] // pour les lignes "network"
 * }} Row 
 */

export default function BinaryIPTable() {
    /** @type {Row[]} */
    const [rows, setRows] = useState([]);

    const addRow = (type /* RowType */) => {
        const newRow = {
            id: crypto.randomUUID(),
            type,
            bits: [Array(8).fill(0), Array(8).fill(0), Array(8).fill(0), Array(8).fill(0)],
        };
        setRows((prev) => [...prev, newRow]);
    };

    // 🗑️ Suppression avec cascade des "network" dépendants
    const removeRow = (idToRemove) => {
        setRows(prev => {
            // 1) supprime la ligne cible
            let next = prev.filter(r => r.id !== idToRemove);
            // 2) supprime les lignes "network" qui dépendent de la cible
            //    (au cas où plusieurs réseaux auraient été créés)
            const dependedBy = new Set(
                next.filter(r => r.type === "network" && r.dependsOn && r.dependsOn.includes(idToRemove))
                    .map(r => r.id)
            );
            if (dependedBy.size > 0) {
                next = next.filter(r => !dependedBy.has(r.id));
            }
            return next;
        });
    };

    function updateBit(rowId, octIdx, bitIdx, val) {
        setRows(prev =>
            prev.map(r =>
                r.id === rowId
                    ? {
                        ...r,
                        bits: r.bits.map((oct, i) =>
                            i === octIdx ? oct.map((b, j) => (j === bitIdx ? val : b)) : oct
                        ),
                    }
                    : r
            )
        );
    }

    const bitsToValue = (bits /* number[] */) =>
        bits.reduce((sum, bit, idx) => sum + bit * BIT_WEIGHTS[idx], 0);

    const rowToIP = (row /* Row */) => row.bits.map(bitsToValue).join(".");

    const resetTable = () => {
        setRows([]); // supprime toutes les lignes
    };

    // ✅ Condition d’activation du bouton "Adresse réseau"
    const canAddNetwork = () => {
        if (rows.length < 2) return false;
        const a = rows[rows.length - 2];
        const b = rows[rows.length - 1];
        const types = new Set([a.type, b.type]);
        return types.has("mask") && types.has("ip");
    };

    // ➕ Créer la ligne "network" à partir des 2 dernières
    const addNetworkFromLastTwo = () => {
        if (!canAddNetwork()) return;
        const maskRow = rows[rows.length - 2].type === "mask" ? rows[rows.length - 2] : rows[rows.length - 1];
        const ipRow = rows[rows.length - 2].type === "ip" ? rows[rows.length - 2] : rows[rows.length - 1];

        const netBits = andBits(maskRow.bits, ipRow.bits);
        const netRow = {
            id: crypto.randomUUID(),
            type: "network",
            bits: netBits,
            dependsOn: [maskRow.id, ipRow.id], // 🔗 pour suppression cascade
        };
        setRows(prev => [...prev, netRow]);
    };

    // Recalcule en live toutes les lignes "network"
    useEffect(() => {
        // indexation par id pour accès O(1)
        const byId = new Map(rows.map(r => [r.id, r]));

        // prépare une version potentiellement mise à jour
        let next = rows;
        let changed = false;

        for (const r of rows) {
            if (r.type !== "network" || !r.dependsOn || r.dependsOn.length !== 2) continue;

            const [maskId, ipId] = r.dependsOn;
            const mask = byId.get(maskId);
            const ip = byId.get(ipId);

            // si une des dépendances a disparu, on laisse (la suppression en cascade se fait ailleurs)
            if (!mask || !ip) continue;

            const newBits = andBits(mask.bits, ip.bits);
            if (!equalBits(r.bits, newBits)) {
                // copie paresseuse du tableau (une seule fois si nécessaire)
                if (!changed) next = rows.map(x => ({ ...x }));
                const idx = next.findIndex(x => x.id === r.id);
                next[idx] = { ...next[idx], bits: newBits };
                changed = true;
            }
        }

        if (changed) setRows(next);
    }, [rows, setRows]);

    const toolbarRef = useRef(null);

    // booléen mémoïsé pour déclencher l’init quand l’état change
    const canAddNet = useMemo(() => canAddNetwork(), [rows]); // ou autres deps utiles

    useEffect(() => {
        const root = toolbarRef.current;
        if (!root) return;

        // initialiser tous les [data-bs-toggle="tooltip"] du toolbar
        const triggers = root.querySelectorAll('[data-bs-toggle="tooltip"]');
        const instances = [...triggers].map(
            (el) => new Tooltip(el, { container: "body", trigger: "hover focus" })
        );

        // nettoyage pour éviter les doublons au hot-reload / re-render
        return () => instances.forEach((i) => i.dispose());
    }, [canAddNet]); // ← réinit à chaque changement d’activation

    return (
        <div>
            <div className="mb-3" ref={toolbarRef}>
                <button className="btn btn-primary me-2" onClick={() => addRow("mask")}>
                    ➕ Masque
                </button>
                <button className="btn btn-success me-2" onClick={() => addRow("ip")}>
                    ➕ Adresse IP
                </button>
                {canAddNet ? (
                    <button className="btn btn-warning me-2" onClick={addNetworkFromLastTwo}>
                        ➕ Adresse réseau
                    </button>
                ) : (
                    // Tooltip sur le SPAN (focusable), bouton vraiment disabled
                    <span
                        className="d-inline-block"
                        tabIndex={0}
                        data-bs-toggle="tooltip"
                        data-bs-title="Les deux dernières lignes doivent être un masque et une adresse IP"
                    >
                        <button
                            type="button"
                            className="btn btn-warning me-2"
                            disabled
                            style={{ pointerEvents: "none" }} // laisse le span recevoir le hover/focus
                        >
                            ➕ Adresse réseau
                        </button>
                    </span>
                )}
                <button className="btn btn-danger" onClick={resetTable}>
                    ♻️ Réinitialiser
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered text-center align-middle ip-table">
                    <thead className="table-dark">
                        <tr>
                            {Array.from({ length: 4 }).map((_, blockIdx) => (
                                <React.Fragment key={blockIdx}>
                                    {BIT_WEIGHTS.map((w) => (
                                        <th key={`${blockIdx}-${w}`}>{w}</th>
                                    ))}
                                    <th width={"46px"}></th>
                                </React.Fragment>
                            ))}
                            <th className="text-nowrap" width="140px">Adresse</th>
                            <th className="actions-cell-header" style={{ width: "3rem" }} />
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row) => {
                            // --- calcul spécial pour les lignes "mask" ---
                            let isMaskValid = true;
                            let lastOneIndex = -1;

                            if (row.type === "mask") {
                                const flatBits = row.bits.flat(); // 32 bits à la suite
                                let seenZero = false;
                                flatBits.forEach((b, idx) => {
                                    if (b === 1) {
                                        if (seenZero) isMaskValid = false; // 1 après 0 => invalide
                                        lastOneIndex = idx;
                                    } else {
                                        seenZero = true;
                                    }
                                });
                            }

                            const rowClass =
                                row.type === "mask"
                                    ? `${isMaskValid ? "table-primary" : "table-primary invalid-mask"} mask-row position-relative`
                                    : row.type === "ip"
                                        ? "table-success position-relative"
                                        : "table-warning position-relative";

                            return (
                                <tr key={row.id} className={rowClass}>
                                    {row.bits.map((octet, octIdx) => (
                                        <React.Fragment key={octIdx}>
                                            {octet.map((bit, bitIdx) => {
                                                // index absolu du bit dans les 32 bits
                                                const bitIndex = octIdx * 8 + bitIdx;

                                                // classes de shading uniquement pour les lignes "mask"
                                                const maskShadeClass =
                                                    row.type === "mask"
                                                        ? `mask-bit ${bitIndex <= lastOneIndex ? "network-cell" : "host-cell"}`
                                                        : "";

                                                return (
                                                    <td key={bitIdx} className={maskShadeClass}>
                                                        {row.type === "network" ? (
                                                            bit
                                                        ) : (
                                                            <input
                                                                className="bit-input"
                                                                type="text"
                                                                inputMode="numeric"
                                                                maxLength={1}
                                                                value={String(bit)}
                                                                onFocus={(e) => e.target.select()}
                                                                onChange={(e) => {
                                                                    const c = e.target.value;
                                                                    updateBit(row.id, octIdx, bitIdx, c === "1" ? 1 : 0);
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    const nav = [
                                                                        "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
                                                                        "Tab", "Home", "End", "Shift", "Control", "Alt", "Meta"
                                                                    ];
                                                                    if (nav.includes(e.key)) return;

                                                                    if (e.key === "Backspace" || e.key === "Delete") {
                                                                        e.preventDefault();
                                                                        updateBit(row.id, octIdx, bitIdx, 0);
                                                                        requestAnimationFrame(() => e.currentTarget.select());
                                                                        return;
                                                                    }

                                                                    if (e.key === "0" || e.key === "1") {
                                                                        e.preventDefault();
                                                                        updateBit(row.id, octIdx, bitIdx, Number(e.key));
                                                                        requestAnimationFrame(() => e.currentTarget.select());
                                                                        return;
                                                                    }

                                                                    if (e.key.length === 1) e.preventDefault();
                                                                }}
                                                                onPaste={(e) => e.preventDefault()}
                                                                aria-label={`Bit ${bitIdx + 1} de l’octet ${octIdx + 1}`}
                                                            />
                                                        )}
                                                    </td>
                                                );
                                            })}
                                            {/* colonne 'Valeur' -> conserve le fond #89b8ff (pas de shading) */}
                                            <td
                                                className={
                                                    row.type === "mask"
                                                        ? bitsToValue(octet) === 255
                                                            ? "mask-bit network-cell"
                                                            : bitsToValue(octet) === 0
                                                                ? "host-cell"
                                                                : ""
                                                        : ""
                                                }
                                            >
                                                {bitsToValue(octet)}
                                            </td>
                                        </React.Fragment>
                                    ))}

                                    {/* IP complète */}
                                    <td className="text-nowrap complete-ip">{rowToIP(row)}</td>

                                    {/* Bouton supprimer ligne (cellule sans bordure si tu as gardé la règle .actions-cell) */}
                                    <td className="actions-cell text-end align-middle">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={() => removeRow(row.id)}
                                            title="Supprimer cette ligne"
                                            aria-label="Supprimer cette ligne"
                                        >
                                            <i className="bi bi-x-lg" />
                                            X
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={4 * 9 + 1} className="text-muted text-center py-4">
                                    Ajoutez une ligne “Masque”, “Adresse IP” ou “Adresse réseau” pour commencer.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
