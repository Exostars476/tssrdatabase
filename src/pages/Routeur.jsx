// src/pages/RouterPage.jsx
import PageWithTocAccordion from "../components/PageWithTocAccordion";

const toc = [
  { id: "reset",          label: "Reset de la configuration initiale",         icon: "🔄" },
  { id: "rename",         label: "Renommer le routeur",                        icon: "🏷️" },
  { id: "enable-secret",  label: "Changer le mot de passe du mode privilégié", icon: "🔑" },
  { id: "console-pass",   label: "Changer le mot de passe console",            icon: "🔑" },
  { id: "vty-pass",       label: "Changer le mot de passe d'accès distant",    icon: "🔑" },
  { id: "pwd-full",       label: "Configuration de mot de passe complète",     icon: "🔒" },
  { id: "ip",             label: "Configuration IP",                           icon: "🌐" },
  { id: "vlan-routeur",   label: "Configuration VLAN",                         icon: "🌐" },
  { id: "rip",            label: "Configuration du protocole RIP",             icon: "📡" },
  { id: "show",           label: "Commandes d'affichage",                      icon: "🖥️" },
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
          <strong>📝 Sur un routeur physique</strong>
          <ul className="mb-0 mt-2">
            <li>Redémarrer le router</li>
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
    title: "Renommer le routeur",
    icon: "🏷️",
    content: (
      <pre><code className="language-bash">{`hostname [NomDuRouteur]
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
    id: "ip",
    title: "Configuration IP",
    icon: "🌐",
    content: (
      <pre><code className="language-bash">{`interface [Interface ex: fa0/0]
ip address [IP] [Masque]
no shutdown
exit
interface [Interface]
ip address [IP] [Masque]
no shutdown
exit
interface [Interface]
ip address [IP] [Masque]
no shutdown
exit`}</code></pre>
    ),
  },
  {
    id: "vlan-routeur",
    title: "Configuration VLAN",
    icon: "🌐",
    content: (
      <pre><code className="language-bash">{`interface [Sous-interface ex: g0/0.10]
encapsulation dot1Q [n°DuVLAN1]
ip address [PasserelleDuVLAN1] [Masque]
exit
interface [Sous-interface ex: g0/0.20]
encapsulation dot1Q [n°DuVLAN2]
ip address [PasserelleDuVLAN2] [Masque]`}</code></pre>
    ),
  },
  {
    id: "rip",
    title: "Configuration du protocole RIP",
    icon: "📡",
    content: (
      <pre><code className="language-bash">{`router rip
version 2
no auto-summary
network [IpD'unRéseauConnuParLeRouteur]
network [IpD'unRéseauConnuParLeRouteur]
network [IpD'unRéseauConnuParLeRouteur]
passive-interface default
no passive-interface [interfaceVersUnAutreRouteur]
end
wr mem`}</code></pre>
    ),
  },
  {
    id: "show",
    title: "Commandes d'affichage",
    icon: "🖥️",
    content: (
      <pre><code className="language-bash">{`show ip route
show ip interface brief
show startup-config
show running-config
show cdp neighbors
show users
show line`}</code></pre>
    ),
  },
];

export default function RouterPage({ contrastClass, onToggleTheme, theme }) {
  return (
    <PageWithTocAccordion
      title="📘 Configuration d'un routeur"
      toc={toc}
      items={items}
      accordionId="routerAccordion"
      contrastClass={contrastClass} 
      singleOpen={false}
      showFloatingControls={true}
      onToggleTheme={onToggleTheme}
      theme={theme}
    />
  );
}
