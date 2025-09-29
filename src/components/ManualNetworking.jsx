import React, { useState } from "react";

const BIT_WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];

/** @typedef {'mask'|'ip'|'network'} RowType */
/** @typedef {{ id: string, type: RowType, bits: number[][] }} Row */

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

    const removeRow = (id) => {
        setRows(prev => prev.filter(r => r.id !== id));
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

    return (
        <div>
            <div className="mb-3">
                <button className="btn btn-outline-primary me-2" onClick={() => addRow("mask")}>
                    ➕ Masque
                </button>
                <button className="btn btn-outline-success me-2" onClick={() => addRow("ip")}>
                    ➕ Adresse IP
                </button>
                <button className="btn btn-outline-warning" onClick={() => addRow("network")}>
                    ➕ Adresse réseau
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
                        {rows.map((row) => (
                            <tr
                                key={row.id}
                                className={
                                    row.type === "mask"
                                        ? "table-primary position-relative"
                                        : row.type === "ip"
                                            ? "table-success position-relative"
                                            : "table-warning position-relative"
                                }
                            >
                                {row.bits.map((octet, octIdx) => (
                                    <React.Fragment key={octIdx}>
                                        {octet.map((bit, bitIdx) => (
                                            <td key={bitIdx}>
                                                {row.type === "network" ? (
                                                    bit
                                                ) : (
                                                    <input
                                                        className="bit-input"
                                                        type="text"
                                                        inputMode="numeric"   // clavier numérique sur mobile
                                                        maxLength={1}         // un seul caractère
                                                        value={String(bit)}   // force l'affichage "0" ou "1"
                                                        onFocus={(e) => e.target.select()}  // sélectionne automatiquement au focus
                                                        onChange={(e) => {
                                                            // garde-fou (coller/saisie IME) : ne prendre que 0/1, sinon 0
                                                            const c = e.target.value;
                                                            updateBit(row.id, octIdx, bitIdx, c === "1" ? 1 : 0);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            // touches de navigation autorisées
                                                            const nav = [
                                                                "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
                                                                "Tab", "Home", "End", "Shift", "Control", "Alt", "Meta"
                                                            ];
                                                            if (nav.includes(e.key)) return;

                                                            // Backspace/Delete -> force 0
                                                            if (e.key === "Backspace" || e.key === "Delete") {
                                                                e.preventDefault();
                                                                updateBit(row.id, octIdx, bitIdx, 0);
                                                                // re-sélectionner le contenu pour la prochaine saisie
                                                                requestAnimationFrame(() => e.currentTarget.select());
                                                                return;
                                                            }

                                                            // autoriser seulement 0 ou 1, et remplacer complètement la valeur
                                                            if (e.key === "0" || e.key === "1") {
                                                                e.preventDefault();
                                                                updateBit(row.id, octIdx, bitIdx, Number(e.key));
                                                                requestAnimationFrame(() => e.currentTarget.select());
                                                                return;
                                                            }

                                                            // toute autre touche "imprimable" est bloquée
                                                            if (e.key.length === 1) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                        onPaste={(e) => e.preventDefault()} // pas de collage libre
                                                        aria-label={`Bit ${bitIdx + 1} de l’octet ${octIdx + 1}`}
                                                    />
                                                )}
                                            </td>
                                        ))}
                                        <td>{bitsToValue(octet)}</td>
                                    </React.Fragment>
                                ))}
                                <td className="text-nowrap">{rowToIP(row)}</td>

                                {/* Bouton supprimer ligne */}
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
                        ))}
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
