// src/pages/RouterPage.jsx
import PageWithTocAccordion from "../components/PageWithTocAccordion";

const toc = [
    { id: "reset", label: "Reset de la configuration initiale", icon: "🔄" },
    { id: "rename", label: "Renommer le switch", icon: "🏷️" },
    { id: "enable-secret", label: "Changer le mot de passe du mode privilégié", icon: "🔑" },
    { id: "console-pass", label: "Changer le mot de passe console", icon: "🔑" },
    { id: "vty-pass", label: "Changer le mot de passe d'accès distant", icon: "🔑" },
    { id: "pwd-full", label: "Configuration de mot de passe complète", icon: "🔒" },
    { id: "dns", label: "Désactiver la résolution DNS", icon: "❌" },
    { id: "mac", label: "Effacer la table d'adresse MAC", icon: "❌" },
    { id: "vlan", label: "Configuration VLAN", icon: "🌐" },
    { id: "trunk", label: "VLAN Trunk-natif", icon: "🌐" },
    { id: "agregation", label: "Regrouper des ports (Agrégation)", icon: "🖧" },
    { id: "security", label: "Sécuriser un port", icon: "🔒" },
    { id: "stp", label: "Spanning-tree Protocol (STP)", icon: "🔒" },
    { id: "vtp", label: "VLAN Trunking Protocol (VTP)", icon: "⚙️" },
    { id: "routing", label: "Routing sur Switch L3", icon: "🌐" },
    { id: "show", label: "Commandes d'affichage", icon: "🖥️" },
];

const items = [
    {
        id: "reset",
        title: "Reset de la configuration initiale",
        icon: "🔄",
        content: (
            <>
                <div className="alert alert-info mb-3" role="alert">
                    <strong>📝 Sur Packet Tracer</strong>
                    <ul className="mb-0 mt-2">
                        <li>Onglet <strong>Config</strong> en haut</li>
                        <li>Onglet <strong>Global &gt; Settings</strong> à gauche</li>
                        <li>Ligne <strong>NVRAM</strong> → cliquer sur le bouton <em>Erase</em></li>
                    </ul>
                </div>

                <div className="alert alert-info mb-3" role="alert">
                    <strong>📝 Sur un switch physique</strong>
                    <ul className="mb-0 mt-2">
                        <li>Redémarrer le switch</li>
                        <li>Pendant le démarrage : envoyer la commande <kbd>break</kbd></li>
                        <li>Le terminal renvoie : <em>command boot interrupt</em></li>
                        <li>Invite affichée : <code>rommon 1 &gt;</code></li>
                        <li>Quand demandé : <em>Initial config</em> → répondre <strong>no</strong></li>
                        <li>Entrer les commandes ci-dessous :</li>
                    </ul>
                </div>

                <pre><code className="language-bash">{`confreg 0x2142
reset
copy running-config startup-config
conf terminal
config-register 0x2102
reload`}</code></pre>
            </>
        ),
    },
    {
        id: "rename",
        title: "Renommer le switch",
        icon: "🏷️",
        content: (
            <pre><code className="language-bash">{`hostname [NomDuSwitch]
exit
copy running-config startup-config`}</code></pre>
        ),
    },
    {
        id: "enable-secret",
        title: "Changer le mot de passe du mode privilégié",
        icon: "🔑",
        content: (
            <pre><code className="language-bash">{`enable secret [MotDePasse]
exit
copy running-config startup-config`}</code></pre>
        ),
    },
    {
        id: "console-pass",
        title: "Changer le mot de passe console",
        icon: "🔑",
        content: (
            <pre><code className="language-bash">{`service password-encryption
line console 0
password [MotDePasse]
login
exit
exit
copy running-config startup-config`}</code></pre>
        ),
    },
    {
        id: "vty-pass",
        title: "Changer le mot de passe d'accès distant",
        icon: "🔑",
        content: (
            <pre><code className="language-bash">{`service password-encryption
line vty 0 [NombreDeConnexionMaximum]
password [MotDePasse]
login
exit
exit
copy running-config startup-config`}</code></pre>
        ),
    },
    {
        id: "pwd-full",
        title: "Configuration de mot de passe complète",
        icon: "🔒",
        content: (
            <pre><code className="language-bash">{`service password-encryption
enable secret [MotDePasse]
line console 0
password [MotDePasse]
login
exit
line vty 0 [NombreDeConnexionMaximum]
password [MotDePasse]
login
exit
exit
copy running-config startup-config`}</code></pre>
        ),
    },
    {
        id: "dns",
        title: "Désactiver la résolution DNS",
        icon: "❌",
        content: (
            <pre><code className="language-bash">{`no ip domain-lookup`}</code></pre>
        ),
    },
    {
        id: "mac",
        title: "Effacer la table d'adresses MAC",
        icon: "❌",
        content: (
            <>
                <pre><code className="language-bash">{`iclear mac address-table dynamic`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>D'un VLAN précis</strong>
                </p>
                <pre><code className="language-bash">{`clear mac address-table dynamic vlan [num_vlan]`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>D'une interface précise</strong>
                </p>
                <pre><code className="language-bash">{`clear mac address-table dynamic interface [interface]`}</code></pre>
            </>
        ),
    },
    {
        id: "vlan",
        title: "Configuration VLAN",
        icon: "🌐",
        content: (
            <>
                <p class="mb-1">
                    <strong>Ajouter un VLAN</strong>
                </p>
                <pre><code className="language-bash">{`VLAN [n°DuVLAN]`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Affecter une interface à un VLAN</strong>
                </p>
                <pre><code className="language-bash">{`interface [NomDeL'interface]
switchport mode access
switchport access vlan [n°DuVLAN]`}</code></pre>
            </>
        ),
    },
    {
        id: "trunk",
        title: "VLAN Trunk natif",
        icon: "🌐",
        content: (
            <pre><code className="language-bash">{`vlan 99
name Management&Native
interface fa0/1
switchport mode trunk
switchport trunk native vlan 99`}</code></pre>
        ),
    },
    {
        id: "agregation",
        title: "Regrouper des ports (Agrégation)",
        icon: "🖧",
        content: (
            <>
                <div className="alert alert-info mb-3 pb-0" role="alert">
                    <p>L'agrégation consiste à regrouper plusieurs ports physique en un port logique.</p>
                    <p>Il faut reconfigurer le vlan trunk natif sur le groupe de ports (port-channel).</p>
                    <p>On considère 3 switch : S1, S2 et S3. S1 étant le switch central.</p>
                    <p>Les interfaces fa0/1 et fa0/2 (port-channel 1) sont groupées pour relier S1 et S2.</p>
                    <p>Les interfaces fa0/3 et fa0/4 (port-channel 2) sont groupées pour relier S1 et S3.</p>
                </div>
                <p className="mb-1">
                    <strong>Sur S1</strong>
                </p>
                <pre><code className="language-bash">{`interface range fa0/1-2
channel-group 1 mode active
interface range fa0/3-4
channel-group 2 mode active
interface port-channel 1
switchport mode trunk
switchport trunk native vlan 99
interface port-channel 2
switchport mode trunk
switchport trunk native vlan 99`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Sur S2</strong>
                </p>  
                <pre><code className="language-bash">{`interface range fa0/1-2
channel-group 1 mode active
interface port-channel 1
switchport mode trunk
switchport trunk native vlan 99`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Sur S3</strong>
                </p>  
                <pre><code className="language-bash">{`interface range fa0/3-4
channel-group 2 mode active
interface port-channel 2
switchport mode trunk
switchport trunk native vlan 99`}</code></pre>
            </>
        ),
    },
    {
        id: "security",
        title: "Sécuriser un port",
        icon: "🔒",
        content: (
            <>
                <p className="mb-1">
                    <strong>Activer la sécurité</strong>
                </p>
                <div className="alert alert-info mb-3 pb-0" role="alert">
                    <p>Le port sécurisé n'autorisera qu'une seule adresse mac. S'il détecte une adresse mac différente, le port se désactivera.</p>
                </div>
                <pre><code className="language-bash">{`interface fa0/11
switchport mode access
switchport port-security
switchport port-security maximum 1
switchport port-security mac-address sticky
switchport port-security violation shutdown`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Désactiver la sécurité</strong>
                </p>
                <pre><code className="language-bash">{`interface fa0/11
no switchport port-security`}</code></pre>
            </>
        ),
    },
    {
        id: "stp",
        title: "Spanning-tree Protocol (STP)",
        icon: "🔒",
        content: (
            <>
                <p className="mb-1">
                    <strong>Activer le STP (il est généralement activé par défaut)</strong>
                </p>
                <pre><code className="language-bash">{`spanning-tree vlan [num_VLAN]`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Réglage de la priorité</strong>
                </p>
                <div className="alert alert-info mb-3 pb-0" role="alert">
                    <p>{`Les priorité vont de 4096 en 4096 (4096 -> 8192 -> 12288 ...)`}</p>
                    <p>Plus elle est basse plus elle est importante. Un STP avec une priorité de 4096 aura le dessus sur un STP avec une priorité de 8192.</p>
                </div>
                <pre><code className="language-bash">{`spanning-tree vlan [num_VLAN] priority [priorité]`}</code></pre>
            </>
        ),
    },
    {
        id: "vtp",
        title: "VLAN Trunking Protocol (VTP)",
        icon: "⚙️",
        content: (
            <>
                <p className="mb-1">
                    <strong>Activer le VTP sur le switch principal (serveur)</strong>
                </p>
                <pre><code className="language-bash">{`vtp mode server
vtp domain [NomDuDomaine]
vtp password [Password]`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Activer le VTP sur le(s) switch client</strong>
                </p>
                <pre><code className="language-bash">{`vtp mode client
vtp domain [NomDuDomaine]
vtp password [Password]`}</code></pre>
            </>
        ),
    },
    {
        id: "routing",
        title: "Routing sur Switch L3",
        icon: "🌐",
        content: (
            <pre><code className="language-bash">{`interface vlan [n°DuVLAN1]
ip address [Passerelle1] [Masque]
exit
interface vlan [n°DuVLAN2]
ip address [Passerelle2] [Masque]
ip routing`}</code></pre>
        ),
    },
    {
        id: "show",
        title: "Commandes d'affichage",
        icon: "🖥️",
        content: (
            <>
                <p className="mb-1">
                    <strong>Afficher la configuration des vlan</strong>
                </p>
                <pre><code className="language-bash">{`show vlan brief`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Afficher les détails d'une interface</strong>
                </p>
                <pre><code className="language-bash">{`show interfaces fastEthernet 0/1 switchport`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Afficher vlan trunk</strong>
                </p>
                <pre><code className="language-bash">{`show interfaces trunk`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Affiche les agrégations</strong>
                </p>
                <pre><code className="language-bash">{`show etherchannel summary`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Afficher la table d'adresse mac</strong>
                </p>
                <pre><code className="language-bash">{`show mac address-table`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Afficher la configuration de sécurité globale</strong>
                </p>
                <pre><code className="language-bash">{`show port-security`}</code></pre>
                <p className="mb-1 mt-4">
                    <strong>Afficher la configuration de sécurité d'une interface</strong>
                </p>
                <pre><code className="language-bash">{`show port-security interface fa0/1`}</code></pre>
            </>
        ),
    },
];

export default function SwitchPage({ contrastClass, onToggleTheme, theme }) {
    return (
        <PageWithTocAccordion
            title="📘 Configuration d'un switch"
            toc={toc}
            items={items}
            accordionId="switchAccordion"
            contrastClass={contrastClass}
            singleOpen={false}
            showFloatingControls={true}
            onToggleTheme={onToggleTheme}
            theme={theme}
        />
    );
}
