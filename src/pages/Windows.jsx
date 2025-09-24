// src/pages/RouterPage.jsx
import PageWithTocAccordion from "../components/PageWithTocAccordion";

const toc = [
    { id: "exec", label: "Commandes d'exécution (windows + R)", icon: "⌨️" },
    { id: "terminal", label: "Commandes terminal et powershell", icon: "🖥️" },
    { id: "shortcut", label: "Raccourcis clavier", icon: "🔑" },
];

const items = [
    {
        id: "exec",
        title: "Commandes d'exécution (windows + R)",
        icon: "⌨️",
        content: (
            <>
                <p className="mb-1">
                    <strong>Panneau des interfaces et connexions réseaux</strong>
                </p>
                <pre><code className="language-bash">ncpa.cpl</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Console de services personnalisée</strong>
                </p>
                <pre><code className="language-bash">mmc</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Gestion de l’ordinateur (disques, services, journaux)</strong>
                </p>
                <pre><code className="language-bash">compmgmt.msc</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Gestion des services Windows</strong>
                </p>
                <pre><code className="language-bash">services.msc</code></pre>

                <p className="mb-1 mt-4">
                    <strong>Gestion des périphériques</strong>
                </p>
                <pre><code className="language-bash">devmgmt.msc</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Éditeur du registre</strong>
                </p>
                <pre><code className="language-bash">regedit</code></pre>

                <p className="mb-1 mt-4">
                    <strong>Observateur d’événements (logs système)</strong>
                </p>
                <pre><code className="language-bash">eventvwr.msc</code></pre>

                <p className="mb-1 mt-4">
                    <strong>Stratégie de sécurité locale</strong>
                </p>
                <pre><code className="language-bash">secpol.msc</code></pre>

                <p className="mb-1 mt-4">
                    <strong>Éditeur de stratégie de groupe locale</strong>
                </p>
                <pre><code className="language-bash">gpedit.msc</code></pre>
            </>
        ),
    },
    {
        id: "terminal",
        title: "Commandes terminal et powershell",
        icon: "🖥️",
        content: (
            <>
                <p className="mb-1">
                    <strong>Ipconfig /all</strong>
                    : Afficher les configurations réseaux
                </p>
                <pre className="terminal"><span className="prompt">{`C:\\Users\\tssr32>`}</span> <span className="command">ipconfig /all</span>
                    <span className="output">Configuration IP de Windows</span>
                    <br/>
                    <span className="output">    Nom de l’hôte . . . . . . . . . . : XXXXXXXXXX</span>
                    <span className="output">    Suffixe DNS principal . . . . . . : XXXXXXX.XXX</span>
                    <span className="output">    Type de noeud. . . . . . . . . .  : Hybride</span>
                    <span className="output">    Routage IP activé . . . . . . . . : Non</span>
                    <span className="output">    Proxy WINS activé . . . . . . . . : Non</span>
                    <span className="output">    Proxy WINS activé . . . . . . . . : Non</span>
                    <span className="output">    Liste de recherche du suffixe DNS.: havretssr.dom</span>
                    <br/>
                    <span className="output">Carte Ethernet Ethernet :</span>
                    <br/>
                    <span className="output">    Statut du média. . . . . . . . . . . . : Média déconnecté</span>
                    <span className="output">    Suffixe DNS propre à la connexion. . . :</span>
                    <span className="output">    Description. . . . . . . . . . . . . . : Realtek PCIe GbE Family Controller</span>
                    <span className="output">    Adresse physique . . . . . . . . . . . : XX-XX-XX-XX-XX-XX</span>
                    <span className="output">    DHCP activé. . . . . . . . . . . . . . : Oui</span>
                    <span className="output">    Configuration automatique activée. . . : Oui</span>
                </pre>
                <p className="mb-1 mt-4">
                    <strong>Ping [Adresse IP]</strong>
                    : Tester la connectivité réseau entre la machine source et un appareil distant
                </p>
                <pre className="terminal"><span className="prompt">{`C:\\Users\\tssr32>`}</span> <span className="command">ping 8.8.8.8</span>
                    <span className="output">Envoi d’une requête 'Ping'  8.8.8.8 avec 32 octets de données :</span>
                    <span className="output">Réponse de 8.8.8.8 : octets=32 temps=5 ms TTL=115</span>
                    <span className="output">Réponse de 8.8.8.8 : octets=32 temps=5 ms TTL=115</span>
                    <span className="output">Réponse de 8.8.8.8 : octets=32 temps=5 ms TTL=115</span>
                    <span className="output">Réponse de 8.8.8.8 : octets=32 temps=5 ms TTL=115</span>
                    <br/>
                    <span className="output">Statistiques Ping pour 8.8.8.8:</span>
                    <span className="output">    Paquets : envoyés = 4, reçus = 4, perdus = 0 (perte 0%),</span>
                    <span className="output">Durée approximative des boucles en millisecondes :</span>
                    <span className="output">    Minimum = 5ms, Maximum = 5ms, Moyenne = 5ms</span>
                </pre>
                <p className="mb-1 mt-4">
                    <strong>Tracert -d [Adresse IP]</strong>
                    : Même chose que le Ping, mais en détaillant les sauts
                </p>
                <pre className="terminal"><span className="prompt">{`C:\\Users\\tssr32>`}</span> <span className="command">tracert -d 8.8.8.8</span>
                    <span className="output">Détermination de l’itinéraire vers 8.8.8.8 avec un maximum de 30 sauts.</span>
                    <br/>
                    <span className="output">{`    1    <1 ms    <1 ms     6 ms  XXX.XXX.XXX.XXX`}</span>
                    <span className="output">{`    2    <1 ms    <1 ms    <1 ms  XXX.XXX.XXX.XXX`}</span>
                    <span className="output">{`    3     1 ms    <1 ms    <1 ms  XXX.XXX.XXX.XXX`}</span>
                    <span className="output">{`    4    <1 ms    <1 ms    <1 ms  XXX.XXX.XXX.XXX`}</span>
                    <span className="output">{`    5     6 ms     5 ms     6 ms  XXX.XXX.XXX.XXX`}</span>
                    <span className="output">{`    6     6 ms     5 ms     5 ms  XXX.XXX.XXX.XXX`}</span>
                    <span className="output">{`    7     5 ms     5 ms     5 ms  XXX.XXX.XXX.XXX`}</span>
                    <span className="output">{`    8     5 ms     5 ms     5 ms  XXX.XXX.XXX.XXX`}</span>
                    <span className="output">{`    9     5 ms     5 ms     5 ms  XXX.XXX.XXX.XXX`}</span>
                    <span className="output">{`    10    5 ms     5 ms     5 ms  8.8.8.8`}</span>
                    <br/>
                    <span className="output">Itinéraire déterminé.</span>
                </pre>
                <p className="mb-1 mt-4">
                    <strong>nslookup [URL ou Adresse IP]</strong>
                    : Interroger un serveur DNS pour obtenir des informations sur la résolution de noms de domaine
                </p>
                <pre className="terminal"><span className="prompt">{`C:\\Users\\tssr32>`}</span> <span className="command">nslookup www.google.com</span>
                    <span className="output">Serveur :   dns.google</span>
                    <span className="output">Address:    8.8.8.8</span>
                    <br/>
                    <span className="output">Réponse ne faisant pas autorité :</span>
                    <span className="output">Nom :    www.google.com</span>
                    <span className="output">Addresses:  142.250.179.196</span>
                    <span className="output">            2a00:1450:4007:812::2004</span>
                </pre>
                <p className="mb-1 mt-4">
                    <strong>netstat -ano</strong>
                    : Affiche les connexions réseau actives et les ports ouverts
                </p>
                <pre className="terminal"><span className="prompt">{`C:\\Users\\tssr32>`}</span> <span className="command">netstat -ano</span>
                    <span className="output">Connexions actives</span>
                    <br/>
                    <span className="output">    Proto  Adresse locale         Adresse distante       État           PID</span>
                    <span className="output">    TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       972</span>
                    <span className="output">    TCP    192.168.1.25:49732     172.217.18.14:443      ESTABLISHED    3568</span>
                    <span className="output">    TCP    [::]:445               [::]:0                 LISTENING       4</span>
                </pre>
                <p className="mb-1 mt-4">
                    <strong>systeminfo</strong>
                    : Affiche les informations détaillées sur le système (OS, BIOS, mémoire, etc.)
                </p>
                <pre className="terminal">
                    <span className="prompt">{`C:\\Users\\tssr32>`}</span> <span className="command">systeminfo</span>
                    <span className="output">Nom de l’hôte:                 PC-XXXXXXX</span>
                    <span className="output">Nom du système d’exploitation: Microsoft Windows 11 Pro</span>
                    <span className="output">Version du système:            10.0.22631 N/A version 22631</span>
                    <span className="output">Fabricant du système:          Microsoft Corporation</span>
                    <span className="output">Modèle du système:             Surface Pro 7</span>
                    <span className="output">Type de processeur:            x64-based PC</span>
                    <span className="output">Mémoire physique totale:       16 384 Mo</span>
                </pre>
                <p className="mb-1 mt-4">
                    <strong>tasklist</strong>
                    : Affiche la liste des processus en cours d’exécution
                </p>
                <pre className="terminal">
                    <span className="prompt">{`C:\\Users\\tssr32>`}</span> <span className="command">tasklist</span>
                    <span className="output">Nom de l’image                 PID  Nom de session  N° session  Utilisation mémoire</span>
                    <span className="output">========================= ======== =============== =========== ==================</span>
                    <span className="output">chrome.exe                   3568 Console          1           250 432 Ko</span>
                    <span className="output">explorer.exe                 1452 Console          1            89 120 Ko</span>
                    <span className="output">cmd.exe                      8740 Console          1             3 456 Ko</span>
                </pre>
            </>
        ),
    },
    {
        id: "shortcut",
        title: "Raccourcis clavier",
        icon: "🔑",
        content: (
            <>
                <ul className="mb-3">
                    <li>Afficher/Masquer le bureau : <code>Win + D</code></li>
                    <li>Ancrer la fenêtre sur la moitié de l'écran : <code>Win + flèche gauche/droite</code></li>
                    <li>Naviguer entre les fenêtres : <code>alt + tab</code></li>
                    <li>Créer un bureau virtuel : <code>Ctrl + Win + D</code></li>
                    <li>Naviguer entre les bureaux virtuels : <code>Ctrl + Win + flèche gauche/droite</code></li>
                    <li>Verouiller la session : <code>Win + L</code></li>
                    <li>Ouvrir l'explorateur de fichier : <code>Win + E</code></li>
                    <li>Ouvrir la boîte d'Exécuter : <code>Win + R</code></li>
                    <li>Ouvrir le gestionnaire des tâches : <code>Ctrl + Shift + Échap</code></li>
                </ul>
            </>
        ),
    },
];

export default function WindowsPage({ contrastClass, onToggleTheme, theme }) {
    return (
        <PageWithTocAccordion
            title="📘 Outils Windows et commandes terminal/powershell"
            toc={toc}
            items={items}
            accordionId="windowsAccordion"
            contrastClass={contrastClass}
            singleOpen={false}
            showFloatingControls={true}
            onToggleTheme={onToggleTheme}
            theme={theme}
        />
    );
}
