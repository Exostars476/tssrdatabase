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

    const bitsToValue = (bits /* number[] */) =>
        bits.reduce((sum, bit, idx) => sum + bit * BIT_WEIGHTS[idx], 0);

    const rowToIP = (row /* Row */) => row.bits.map(bitsToValue).join(".");

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

            <div className="table-wrapper">
                <table className="table table-bordered text-center align-middle">
                    <thead className="table-dark">
                        <tr>
                            {Array.from({ length: 4 }).map((_, blockIdx) => (
                                <React.Fragment key={blockIdx}>
                                    {BIT_WEIGHTS.map((w) => (
                                        <th key={`${blockIdx}-${w}`}>{w}</th>
                                    ))}
                                    <th></th>
                                </React.Fragment>
                            ))}
                            <th>Adresse</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row) => (
                            <tr
                                key={row.id}
                                className={
                                    row.type === "mask" ? "table-primary" :
                                        row.type === "ip" ? "table-success" : "table-warning"
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
                                <td>{rowToIP(row)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
