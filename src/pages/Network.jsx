import { useState } from "react";
import ManualNetworking from "../components/ManualNetworking";

// ===== Helpers IP =====
function ipToInt(ip) {
    return ip
        .trim()
        .split(".")
        .reduce((acc, oct) => (acc << 8) + (parseInt(oct, 10) & 255), 0) >>> 0;
}

function intToIp(num) {
    return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join(".");
}

function prefixToMaskInt(prefix) {
    if (prefix <= 0) return 0 >>> 0;
    if (prefix >= 32) return 0xffffffff >>> 0;
    return (0xffffffff << (32 - prefix)) >>> 0;
}

function prefixToDottedMask(prefix) {
    return intToIp(prefixToMaskInt(prefix));
}

function maskToCidr(mask) {
    return (
        "/" +
        mask
            .split(".")
            .map((oct) => parseInt(oct, 10).toString(2).padStart(8, "0"))
            .join("")
            .replace(/0+$/, "").length
    );
}

function cidrToMask(cidr) {
    const bits = parseInt(cidr.replace("/", ""), 10);
    return [0, 0, 0, 0]
        .map((_, i) => (bits - i * 8 > 8 ? 8 : bits - i * 8 < 0 ? 0 : bits - i * 8))
        .map((v) => 256 - Math.pow(2, 8 - v))
        .join(".");
}

// ===== Helpers VLSM =====
function requiredHostBits(hosts) {
    const needed = Math.max(hosts + 2, 4); // min /30
    let bits = 0,
        size = 1;
    while (size < needed) {
        size <<= 1;
        bits++;
    }
    return bits;
}

function blockSizeFromHosts(hosts) {
    return 1 << requiredHostBits(hosts);
}

function alignToBlock(addr, blockSize) {
    const mask = ~(blockSize - 1) >>> 0;
    return (addr + blockSize - 1) & mask;
}

export default function NetworkPage() {
    const [mode, setMode] = useState("calculateur"); // "calculateur" ou "manuel"

    // ============== CALCULATEUR ============== //
    // Form principal
    const [ip, setIp] = useState("");
    const [maskInput, setMaskInput] = useState("");
    const [maskMode, setMaskMode] = useState("classic"); // 'classic' | 'cidr'

    // Résultats du calcul simple
    const [results, setResults] = useState(null); // {network, firstHost, lastHost, broadcast, numberOfHosts}
    const [showPlanner, setShowPlanner] = useState(false);

    // Planification VLSM
    const [subnets, setSubnets] = useState([]); // [{id, name, hosts}]
    const [planAlert, setPlanAlert] = useState("");
    const [planRows, setPlanRows] = useState([]); // résultat du plan

    const maskPlaceholder = maskMode === "classic" ? "255.255.255.0" : "/24";

    // Soumission du formulaire principal
    function onSubmit(e) {
        e.preventDefault();
        if (!ip || !maskInput) return;

        let maskInt;
        if (maskMode === "cidr") {
            const bits = parseInt(maskInput.replace("/", ""), 10);
            if (Number.isNaN(bits) || bits < 0 || bits > 32) return;
            maskInt = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
        } else {
            maskInt = ipToInt(maskInput);
        }

        const ipInt = ipToInt(ip);
        const network = ipInt & maskInt;
        const broadcast = network | (~maskInt >>> 0);
        const firstHost = network + 1;
        const lastHost = broadcast - 1;
        const numberOfHosts = Math.max(0, lastHost - firstHost + 1);

        setResults({
            network: intToIp(network),
            firstHost: intToIp(firstHost),
            lastHost: intToIp(lastHost),
            broadcast: intToIp(broadcast),
            numberOfHosts,
        });
        setShowPlanner(true);
    }

    // Switch CIDR / classic
    function toggleMaskMode() {
        if (maskMode === "classic") {
            setMaskMode("cidr");
            setMaskInput(maskInput ? maskToCidr(maskInput) : "");
        } else {
            setMaskMode("classic");
            setMaskInput(maskInput ? cidrToMask(maskInput) : "");
        }
    }

    // Reset
    function resetAll() {
        setIp("");
        setMaskInput("");
        setResults(null);
        setShowPlanner(false);
        setSubnets([]);
        setPlanRows([]);
        setPlanAlert("");
    }

    // Subnets UI
    function addSubnetRow(defaultName = "", defaultHosts = "") {
        setSubnets((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                name: defaultName,
                hosts: defaultHosts,
            },
        ]);
    }
    function removeSubnetRow(id) {
        setSubnets((prev) => prev.filter((s) => s.id !== id));
    }
    function updateSubnet(id, patch) {
        setSubnets((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    }

    // Génération du plan VLSM
    function generatePlan() {
        setPlanAlert("");
        setPlanRows([]);

        const ipStr = ip.trim();
        const maskStr = maskInput.trim();
        if (!ipStr || !maskStr) {
            setPlanAlert("Veuillez renseigner l'adresse IP et le masque/CIDR.");
            return;
        }

        let maskInt;
        if (maskMode === "cidr") {
            const bits = parseInt(maskStr.replace("/", ""), 10);
            if (Number.isNaN(bits) || bits < 0 || bits > 32) {
                setPlanAlert("CIDR invalide.");
                return;
            }
            maskInt = prefixToMaskInt(bits);
        } else {
            maskInt = ipToInt(maskStr);
            if (!Number.isFinite(maskInt)) {
                setPlanAlert("Masque invalide.");
                return;
            }
        }

        const ipInt = ipToInt(ipStr);
        const baseNet = (ipInt & maskInt) >>> 0;
        const baseBroadcast = (baseNet | (~maskInt >>> 0)) >>> 0;

        const items = subnets
            .map((s, idx) => ({
                name: s.name?.trim() || `Subnet ${idx + 1}`,
                hosts: parseInt(String(s.hosts), 10),
            }))
            .filter((x) => Number.isFinite(x.hosts) && x.hosts > 0);

        if (items.length === 0) {
            setPlanAlert("Ajoutez au moins un sous-réseau.");
            return;
        }

        items.forEach((i) => (i.blockSize = blockSizeFromHosts(i.hosts)));
        items.sort((a, b) => b.blockSize - a.blockSize);

        const plan = [];
        let nextAddr = baseNet;

        for (const it of items) {
            const size = it.blockSize;
            const prefix = 32 - Math.log2(size);

            const aligned = alignToBlock(nextAddr, size);
            const netAddr = aligned >>> 0;
            const bcast = (netAddr + size - 1) >>> 0;

            if (netAddr < baseNet || bcast > baseBroadcast) {
                setPlanAlert(
                    "Espace insuffisant dans le réseau de base pour allouer tous les sous-réseaux demandés."
                );
                break;
            }

            const firstHost = size >= 4 ? (netAddr + 1) >>> 0 : netAddr;
            const lastHost = size >= 4 ? (bcast - 1) >>> 0 : bcast;
            const usable = Math.max(0, size - 2);

            plan.push({
                name: it.name,
                network: intToIp(netAddr),
                mask: prefixToDottedMask(prefix),
                cidr: `/${prefix}`,
                broadcast: intToIp(bcast),
                range: size >= 4 ? `${intToIp(firstHost)} - ${intToIp(lastHost)}` : "—",
                hostsMax: usable,
            });

            nextAddr = (bcast + 1) >>> 0;
        }

        if (plan.length !== items.length) return;
        setPlanRows(plan);
    }

    return (
        <section id="network_page" className="page-section">
            <div className="container-fluid mt-6">
                {/* Toggle Calculateur / Manuel */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="h3 mb-0">🌐 Outils Réseau</h1>
                    <div className="btn-group">
                        <button
                            className={`btn btn-sm ${mode === "calculateur" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setMode("calculateur")}
                        >
                            Calculateur
                        </button>
                        <button
                            className={`btn btn-sm ${mode === "manuel" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setMode("manuel")}
                        >
                            Manuel
                        </button>
                    </div>
                </div>

                {/* Affichage conditionnel global par TERNAIRE */}
                {mode === "calculateur" ? (
                    <>
                        <div className="card mb-4">
                            <div className="card-body">
                                <form onSubmit={onSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="ipAddress" className="form-label">
                                                Adresse IP
                                            </label>
                                            <input
                                                type="text"
                                                id="ipAddress"
                                                className="form-control"
                                                placeholder="192.168.1.10"
                                                value={ip}
                                                onChange={(e) => setIp(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label d-flex justify-content-between" htmlFor="subnetMask">
                                                <span>Masque de sous-réseau</span>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-secondary py-0"
                                                    onClick={toggleMaskMode}
                                                    aria-label="Basculer mode masque"
                                                    title="Basculer CIDR / Classique"
                                                >
                                                    {maskMode === "classic" ? "CIDR" : "Classique"}
                                                </button>
                                            </label>
                                            <input
                                                type="text"
                                                id="subnetMask"
                                                className="form-control"
                                                placeholder={maskPlaceholder}
                                                value={maskInput}
                                                onChange={(e) => setMaskInput(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-3 row gy-2 gx-3 justify-content-between px-1">
                                        <div className="col-auto">
                                            <button type="submit" className="btn btn-primary btn-network">
                                                Calculer
                                            </button>
                                        </div>
                                        <div className="col-auto">
                                            <button type="button" className="btn btn-outline-secondary btn-network" onClick={resetAll}>
                                                Réinitialiser
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        {/* Résultats */}
                        {results && (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Résultats</h5>
                                    <p>
                                        <strong>Adresse réseau :</strong> <span>{results.network}</span>
                                    </p>
                                    <p>
                                        <strong>Première adresse hôte :</strong> <span>{results.firstHost}</span>
                                    </p>
                                    <p>
                                        <strong>Dernière adresse hôte :</strong> <span>{results.lastHost}</span>
                                    </p>
                                    <p>
                                        <strong>Adresse de broadcast :</strong> <span>{results.broadcast}</span>
                                    </p>
                                    <p>
                                        <strong>Nombre d’hôtes disponibles :</strong> <span>{results.numberOfHosts}</span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Planificateur VLSM */}
                        {showPlanner && (
                            <div className="card mt-4">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
                                        <h5 className="card-title mb-0">Planification de sous-réseaux (VLSM)</h5>
                                        <div className="d-flex flex-wrap gap-2">
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                type="button"
                                                onClick={() => addSubnetRow()}
                                            >
                                                Ajouter un sous-réseau
                                            </button>
                                            <button className="btn btn-primary btn-sm" type="button" onClick={generatePlan}>
                                                Générer le plan
                                            </button>
                                        </div>
                                    </div>

                                    {/* Liste de sous-réseaux à saisir */}
                                    <div className="vstack gap-2" id="subnetList">
                                        {subnets.map((row) => (
                                            <div className="row g-2 align-items-end" key={row.id}>
                                                <div className="col-md-6">
                                                    <label className="form-label">Nom du sous-réseau</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Ex: Réseau A"
                                                        value={row.name}
                                                        onChange={(e) => updateSubnet(row.id, { name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label">Nombre de machines</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        min={1}
                                                        step={1}
                                                        placeholder="Ex: 42"
                                                        value={row.hosts}
                                                        onChange={(e) => updateSubnet(row.id, { hosts: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-md-2 d-grid">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger"
                                                        onClick={() => removeSubnetRow(row.id)}
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {subnets.length === 0 && (
                                            <div className="text-muted small">Ajoutez des sous-réseaux puis cliquez sur “Générer le plan”.</div>
                                        )}
                                    </div>

                                    {/* Alerte */}
                                    {planAlert && (
                                        <div id="subnetAlert" className="alert alert-danger mt-3" role="alert">
                                            {planAlert}
                                        </div>
                                    )}

                                    {/* Tableau du plan */}
                                    {planRows.length > 0 && (
                                        <div className="mt-3">
                                            <div className="table-responsive">
                                                <table className="table table-striped table-bordered align-middle">
                                                    <thead>
                                                        <tr>
                                                            <th>Nom</th>
                                                            <th>Adresse réseau</th>
                                                            <th>Masque</th>
                                                            <th>CIDR</th>
                                                            <th>Broadcast</th>
                                                            <th>Plage IP</th>
                                                            <th>Hôtes</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {planRows.map((r, i) => (
                                                            <tr key={i}>
                                                                <td>{r.name}</td>
                                                                <td><code>{r.network}</code></td>
                                                                <td><code>{r.mask}</code></td>
                                                                <td><code>{r.cidr}</code></td>
                                                                <td><code>{r.broadcast}</code></td>
                                                                <td>{r.range !== "—" ? <code>{r.range}</code> : "—"}</td>
                                                                <td>{r.hostsMax}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                ) : (                    
                    <>
                        {/* Mode manuel */}
                        <ManualNetworking />
                    </>  
                )}
            </div>
        </section>
    );
}