// src/pages/RouterPage.jsx
import PageWithTocAccordion from "../components/PageWithTocAccordion";

const toc = [
    { id: "nav", label: "Navigation & chemins", icon: "📂" },
    { id: "copy", label: "Copie & déplacement", icon: "📥" },
    { id: "remove", label: "Suppression", icon: "🗑️" },
    { id: "dirs", label: "Gestion des dossiers", icon: "📁" },
    { id: "info", label: "Informations & fichiers", icon: "ℹ️" },
    { id: "view-search", label: "Affichage et recherche dans les fichiers", icon: "📑" },
    { id: "vi", label: "Édition de fichiers avec vi (vim)", icon: "✏️" },
    { id: "users", label: "Utilisateurs et Groupes", icon: "👥" },
    { id: "rights", label: "Gestion des droits", icon: "🔒" },
    { id: "packages", label: "Gestion des paquets (Ubuntu/Debian)", icon: "📦" },
    { id: "netplan", label: "Réseau avec Netplan", icon: "🕸️" },
    { id: "vhost", label: "VirtualHost avec Apache2", icon: "🌐" },
    { id: "ssh", label: "Accès à distance via SSH", icon: "🔑" },
];

const items = [
    {
        id: "nav",
        title: "Navigation et gestion des chemins",
        icon: "📂",
        content: (
            <>
                <p className="mb-1">
                    <strong>pwd</strong>
                    : affiche le chemin complet du répertoire courant.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span>
                    <span className="command">pwd</span>
                    <span className="output">/home/user</span>
                </pre>
                <p className="mb-1 mt-4">
                    <strong>cd</strong>
                    : permet de changer de répertoire.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">cd Documents</span></pre>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~/Documents$</span> <span className="command">cd ..</span></pre>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">cd ~</span></pre>
                <p className="mb-1"><strong>Options utiles</strong></p>
                <ul>
                    <li>
                        <code>cd ..</code>
                        → remonter d’un dossier
                    </li>
                    <li>
                        <code>cd ~</code>
                        → aller dans le répertoire personnel
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "copy",
        title: "Copie et déplacement",
        icon: "📥",
        content: (
            <>
                <p className="mb-1">
                    <strong>cp</strong>
                    : copie un fichier d’un endroit à un autre.
                </p>
                <pre className="terminal">
                    <span className="prompt">user@user-ubuntu:~$</span> <span className="command">cp fichier.txt copie.txt</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">user@user-ubuntu:~$</span> <span className="command">cp -v fichier.txt copie.txt</span>
                    <span className="output">{`'fichier.txt' -> 'copie.txt'`}</span>
                </pre>
                <p className="mb-1"><strong>Options utiles</strong></p>
                <ul>
                    <li>
                        <code>-i</code>
                        → demande confirmation avant d’écraser un fichier
                    </li>
                    <li>
                        <code>-v</code>
                        → affiche ce qui est copié
                    </li>
                </ul>
                <p className="mb-1 mt-4">
                    <strong>cp -R</strong>
                    : copie un dossier et tout son contenu récursivement.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">cp -R MonDossier Sauvegarde/</span></pre>

                <p className="mb-1 mt-4">
                    <strong>mv</strong>
                    : déplace ou renomme un fichier/dossier.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">mv fichier.txt nouveau_nom.txt</span></pre>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">mv -v fichier.txt Documents/</span>
                    <span className="output">{`renommé 'fichier.txt' -> 'Documents/fichier.txt'`}</span>
                </pre>
                <p className="mb-1"><strong>Options utiles</strong></p>
                <ul>
                    <li>
                        <code>-i</code>
                        → confirmation avant d’écraser
                    </li>
                    <li>
                        <code>-v</code>
                        → affiche les déplacements/renommages
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "remove",
        title: "Suppression",
        icon: "🗑️",
        content: (
            <>
                <p className="mb-1">
                    <strong>rm</strong>
                    : supprime un fichier.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">rm fichier.txt</span></pre>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">rm -v fichier.txt</span>
                    <span className="output">supprimé 'fichier.txt'</span>
                </pre>
                <p className="mb-1"><strong>Options utiles</strong></p>
                <ul>
                    <li>
                        <code>-i</code>
                        → confirmation avant suppression
                    </li>
                    <li>
                        <code>-f</code>
                        → force la suppression sans demander
                    </li>
                    <li>
                        <code>-v</code>
                        → affiche les fichiers supprimés
                    </li>
                </ul>

                <p className="mb-1 mt-4">
                    <strong>rm -R</strong>
                    : supprime un dossier et son contenu récursivement.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">rm -R MonDossier</span></pre>
            </>
        ),
    },
    {
        id: "dirs",
        title: "Gestion des dossiers",
        icon: "📁",
        content: (
            <>
                <p className="mb-1">
                    <strong>mkdir</strong>
                    : crée un dossier.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">mkdir Projet</span></pre>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">mkdir -v Dossiers</span>
                    <span className="output">mkdir: création du répertoire 'Dossiers'</span>
                </pre>
                <p className="mb-1"><strong>Options utiles</strong></p>
                <ul>
                    <li>
                        <code>-v</code>
                        → affiche les dossiers créés
                    </li>
                </ul>

                <p className="mb-1 mt-4">
                    <strong>mkdir -p</strong>
                    : crée un dossier et tous les dossiers parents nécessaires.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">mkdir -p Dossiers/SousDossier</span></pre>

                <p className="mb-1 mt-4">
                    <strong>rmdir</strong>
                    : supprime un dossier vide.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">rmdir Projet</span></pre>

                <p className="mb-1 mt-4">
                    <strong>rmdir -p</strong>
                    : supprime un dossier vide et ses parents vides.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">rmdir -p Dossiers/SousDossier</span></pre>
            </>
        ),
    },
    {
        id: "info",
        title: "Informations et fichiers",
        icon: "ℹ️",
        content: (
            <>
                <p className="mb-1">
                    <strong>ls</strong>
                    : liste les fichiers et dossiers.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">ls</span>
                    <span className="output">Bureau  Documents  Images  Modèles  Musique  Public  Téléchargements  Vidéos</span></pre>
                <p className="mb-1"><strong>Options utiles</strong></p>
                <ul>
                    <li>
                        <code>-l</code>
                        → affiche les détails (permissions, taille, date…)
                    </li>
                    <li>
                        <code>-a</code>
                        → affiche les fichiers cachés
                    </li>
                    <li>
                        <code>-h</code>
                        → tailles lisibles (Ko, Mo…)
                    </li>
                    <li>
                        <code>-R</code>
                        → liste récursive
                    </li>
                </ul>
                <p className="mb-1"><strong>Exemple courant</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">ls -lah</span>
                    <span className="output">drwxr-xr-x 20 user user 4,0K janv.  1 10:00 .</span>
                    <span className="output">drwxr-xr-x  3 root root 4,0K déc.  31 22:00 ..</span>
                    <span className="output">-rw-r--r--  1 user user  220 janv.  1 09:59 .bash_logout</span>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>touch</strong>
                    : crée un fichier vide ou met à jour la date de modification.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">touch nouveau.txt</span></pre>

                <p className="mb-1 mt-4">
                    <strong>file</strong>
                    : indique le type d’un fichier.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">file nouveau.txt</span>
                    <span className="output">nouveau.txt: empty</span></pre>
            </>
        ),
    },
    {
        id: "view-search",
        title: "Affichage et recherche dans les fichiers",
        icon: "📑",
        content: (
            <>
                <p className="mb-1">
                    <strong>cat</strong>
                    : affiche le contenu complet d’un fichier.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">cat fichier.txt</span>
                    <span className="output">Ligne 1 du fichier</span>
                    <span className="output">Ligne 2 du fichier</span>
                    <span className="output">Ligne 3 du fichier</span>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>less</strong>
                    : permet de parcourir le contenu d’un fichier page par page.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">less fichier.txt</span>
                    <span className="output"># (affiche le fichier page par page, navigation avec ↑ ↓ PgUp PgDn, quitter avec q)</span>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>head</strong>
                    : affiche les premières lignes d’un fichier (par défaut 10).
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">head fichier.txt</span>
                    <span className="output">Ligne 1 du fichier</span>
                    <span className="output">Ligne 2 du fichier</span>
                    <span className="output">...</span>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>tail</strong>
                    : affiche les dernières lignes d’un fichier (par défaut 10).
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">tail fichier.txt</span>
                    <span className="output">...</span>
                    <span className="output">Ligne 9 du fichier</span>
                    <span className="output">Ligne 10 du fichier</span>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>grep</strong>
                    : recherche une chaîne de caractères dans un fichier.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">grep "erreur" fichier.log</span>
                    <span className="output">[2024-01-01 12:00] erreur: connexion perdue</span>
                    <span className="output">[2024-01-01 12:05] erreur: tentative échouée</span>
                </pre>
                <p className="mb-1"><strong>Options utiles</strong></p>
                <ul>
                    <li>
                        <code>-i</code>
                        → ignore la casse
                    </li>
                    <li>
                        <code>-r</code>
                        → recherche récursive dans un dossier
                    </li>
                    <li>
                        <code>-n</code>
                        → affiche le numéro de ligne
                    </li>
                </ul>

                <p className="mb-1 mt-4">
                    <strong>find</strong>
                    : recherche des fichiers/dossiers dans l’arborescence.
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">find . -name "*.txt"</span>
                    <span className="output">./notes.txt</span>
                    <span className="output">./Documents/todo.txt</span>
                    <span className="output">./Projets/test/test.txt</span>
                </pre>
            </>
        ),
    },
    {
        id: "vi",
        title: "Édition de fichiers avec vi (vim)",
        icon: "✏️",
        content: (
            <>
                <p className="mb-1">
                    <strong>Ouvrir un fichier (ou le créer s’il n’existe pas)</strong>
                </p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">vi notes.txt</span>
                    <span className="output"># (vi s'ouvre en plein écran. Au départ, vous êtes en mode NORMAL)</span>
                </pre>

                <h4 className="mb-1 mt-4 mb-4"><strong>Commandes de VI</strong></h4>
                <p className="mb-1">
                    <strong>Éditer du texte</strong>
                    <ul className="mb-3">
                        <li>Mode insertion : <code>a</code></li>
                        <li>Quitter le mode insertion : <code>Échap</code></li>
                    </ul>
                </p>
                <p className="mb-1 mt-4">
                    <strong>Enregistrer et quitter</strong>
                    <ul className="mb-3">
                        <li>Enregistrer : <code>:w</code></li>
                        <li>Enregistrer sous : <code>:w /chemin/vers/le/fichier</code></li>
                        <li>Quitter : <code>:q</code></li>
                        <li>Enregistrer et quitter : <code>:x</code> ou <code>:wq</code></li>
                        <li>Forcer la commande : ajouter <code>!</code> ex: <code>:q!</code></li>
                    </ul>
                </p>
                <p className="mb-1 mt-4">
                    <strong>Naviguer</strong>
                    <ul className="mb-3">
                        <li>Gauche : <code>h</code> ou <code>flèche gauche</code></li>
                        <li>Bas : <code>j</code> ou <code>flèche bas</code></li>
                        <li>Haut : <code>k</code> ou <code>flèche haut</code></li>
                        <li>droite : <code>l</code> ou <code>flèche droite</code></li>
                        <li>Mot suivant : <code>w</code></li>
                        <li>Mot précédent : <code>b</code></li>
                        <li>Fin du mot : <code>e</code></li>
                        <li>Sauter 3 mots : <code>3w</code></li>
                        <li>Début du fichier <code>:1</code></li>
                        <li>Aller à la 1ère ligne : <code>gg</code></li>
                        <li>Aller à la 10ème ligne : <code>:10</code></li>
                        <li>Aller à la dernière ligne : <code>G</code></li>
                        <li>Début de la ligne : <code>0</code></li>
                        <li>Fin de la ligne : <code>$</code></li>
                        <li>Fin du fichier : <code>:$</code></li>
                        <li>Ajouter une ligne en dessous : <code>o</code></li>
                    </ul>
                </p>
                <p className="mb-1 mt-4">
                    <strong>Copier / couper / Coller</strong>
                    <ul className="mb-3">
                        <li>Copier une ligne : <code>Y</code></li>
                        <li>Copier 10 lignes : <code>10Y</code></li>
                        <li>Copier un mot : <code>cw</code></li>
                        <li>Couper ou supprimer une ligne : <code>dd</code></li>
                        <li>Couper ou supprimer 10 ligne : <code>10dd</code></li>
                        <li>Couper ou supprimer un mot : <code>dw</code></li>
                        <li>Coller <code>p</code></li>
                    </ul>
                </p>
                <p className="mb-1 mt-4">
                    <strong>Undo / redo</strong>
                    <ul className="mb-3">
                        <li>Undo : <code>u</code></li>
                        <li>Redo : <code>.</code> ou <code>Ctrl+r</code></li>
                    </ul>
                </p>
                <p className="mb-1 mt-4">
                    <strong>Rechercher</strong>
                    <ul className="mb-3">
                        <li>Rechercher du texte : <code>/texte</code></li>
                        <li>Rechercher du texte vers le haut : <code>?texte</code></li>
                        <li>Occurence suivante : <code>n</code></li>
                        <li>Occurence précédente : <code>N</code></li>
                    </ul>
                </p>
                <p className="mb-1 mt-4">
                    <strong>Remplacer / Supprimer</strong>
                    <ul className="mb-3">
                        <li>Remplacer une lettre : <code>r</code></li>
                        <li>Supprimer un mot : <code>dw</code></li>
                        <li>Supprimer une ligne : <code>dd</code></li>
                        <li>Supprimer 10 ligne : <code>10dd</code></li>
                        <li>Supprimer la ligne à partir du curseur : <code>D</code></li>
                    </ul>
                </p>
                <p className="mb-1 mt-4">
                    <strong>Divers</strong>
                    <ul className="mb-3">
                        <li>Afficher les numéros de ligne : <code>:set nu</code></li>
                        <li>Masquer les numéros de ligne : <code>:set nu!</code></li>
                    </ul>
                </p>
            </>
        ),
    },
    {
        id: "users",
        title: "Utilisateurs et Groupes",
        icon: "👥",
        content: (
            <>
                <p className="mb-1">
                    <strong>adduser</strong>
                    : crée un nouvel utilisateur et configure ses informations.
                </p>
                <pre className="terminal">
                    <span className="prompt">root@serveur:~#</span>{" "}
                    <span className="command">adduser marc</span>
                    <span className="output">
                        Ajout de l'utilisateur "marc" ...
                        <br />
                        Ajout du nouveau groupe "marc" (1008) ...
                        <br />
                        Ajout du nouvel utilisateur "marc" (1008) avec le groupe "marc" (1008)
                        <br />
                        Création du répertoire personnel "/home/marc" ...
                        <br />
                        Nouveau mot de passe :
                    </span>
                </pre>

                <p className="mb-1"><strong>Options utiles</strong></p>
                <ul>
                    <li><code>--home /chemin</code> → définit un dossier personnel personnalisé</li>
                    <li><code>--shell /bin/bash</code> → définit le shell par défaut</li>
                    <li><code>--ingroup nom_groupe</code> → rattache l’utilisateur à un groupe existant</li>
                </ul>

                <p className="mb-1 mt-4">
                    <strong>addgroup</strong>
                    : crée un nouveau groupe.
                </p>
                <pre className="terminal">
                    <span className="prompt">root@serveur:~#</span>{" "}
                    <span className="command">addgroup developpeurs</span>
                    <span className="output">
                        Ajout du groupe `developpeurs' (GID 1009) ...
                    </span>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>usermod</strong>
                    : modifie un utilisateur existant (ex. pour l’ajouter à un groupe).
                </p>
                <pre className="terminal">
                    <span className="prompt">root@serveur:~#</span>{" "}
                    <span className="command">usermod -aG tssr marc</span>
                </pre>
                <span className="output d-block mb-2">
                    ➜ ajoute l’utilisateur <code>marc</code> au groupe <code>tssr</code> sans le retirer de ses autres groupes.
                </span>

                <p className="mb-1"><strong>Options utiles</strong></p>
                <ul>
                    <li><code>-a</code> → ajoute sans écraser les groupes existants (doit être utilisé avec <code>-G</code>)</li>
                    <li><code>-G</code> → indique le ou les groupes à ajouter (séparés par des virgules)</li>
                </ul>

                <p className="mb-1"><strong>Vérifier l’appartenance à un groupe</strong></p>
                <pre className="terminal">
                    <span className="prompt">user@ubuntu:~$</span>{" "}
                    <span className="command">groups marc</span>
                    <span className="output">marc : marc tssr sudo</span>
                </pre>
            </>
        ),
    },
    {
        id: "rights",
        title: "Gestion et droits",
        icon: "🔒",
        content: (
            <>
                <p className="mb-1">
                    <strong>ls -l</strong>
                    : affiche les droits, propriétaires et groupes des fichiers et dossiers.
                </p>
                <pre className="terminal">
                    <span className="prompt">user@ubuntu:~$</span>{" "}
                    <span className="command">ls -l</span>
                    <span className="output">-rw-r--r-- 1 user user 4096 oct. 7 09:00 fichier.txt</span>
                </pre>
                <div className="alert alert-info mb-3" role="alert">
                    <strong>Système de permissions sur un fichier :</strong>
                    <ul className="mb-0 mt-2">
                        <li>les 10 premiers caractères représentent les permissions :</li>
                        <code className="ms-1">[type][propriétaire][groupe][autres]</code>
                        <li className="mt-2">Chaque droit est représenté par une lettre et une valeur numérique :</li>
                        Lecture = r = 4 | Écriture = w = 2 | Exécution = x = 1 | Aucun droit = - = 0
                        <li className="mt-2">Ils sont représentés par 3 par 3 propriétaire|groupe|autres, puis sont additionnés pour former un nombre à 3 chiffres :</li>
                        r+w+x|r+w+x|r+w+x
                        <li className="mt-2">Exemple : 4+2+1|4+0+1|4+0+1 = 755 :</li>
                        Propriétaire : contrôle total | Groupe : lecture + exécution | Autres : lecture + exécution
                    </ul>
                </div>
                <p className="mb-1">
                    <strong>chmod</strong>
                    : modifie les droits d’un fichier ou dossier.
                </p>
                <pre className="terminal">
                    <span className="prompt">user@ubuntu:~$</span>{" "}
                    <span className="command">chmod 755 script.sh</span>
                </pre>
                <span className="output d-block mb-2">
                    ➜ donne tous les droits au propriétaire, lecture/exécution aux autres.
                </span>
                <p className="mb-1"><strong>Modes d’utilisation</strong></p>
                <ul>
                    <li>
                        <strong>Numérique</strong> : <code>r=4</code>, <code>w=2</code>, <code>x=1</code> → ex. <code>chmod 644</code>
                    </li>
                    <li>
                        <strong>Symbolique</strong> : <code>chmod u+x fichier</code> : ajoute exécution au propriétaire (u = propriétaire | g = groupe | o = other)
                    </li>
                </ul>

                <p className="mb-1 mt-4">
                    <strong>chown</strong>
                    : change le propriétaire et/ou le groupe d’un fichier.
                </p>
                <pre className="terminal">
                    <span className="prompt">root@serveur:~#</span>{" "}
                    <span className="command">chown user:group fichier.txt</span>
                </pre>
                <span className="output d-block mb-2">
                    ➜ attribue <code>user</code> comme propriétaire et <code>group</code> comme groupe.
                </span>
                <ul>
                    <li><code>chown user fichier</code> → change uniquement le propriétaire</li>
                    <li><code>chown :group fichier</code> → change uniquement le groupe</li>
                    <li><code>-R</code> → applique récursivement dans un dossier</li>
                </ul>

                <p className="mb-1 mt-4">
                    <strong>Vérifier les droits</strong>
                </p>
                <pre className="terminal">
                    <span className="prompt">user@ubuntu:~$</span>{" "}
                    <span className="command">stat fichier.txt</span>
                    <span className="output">
                        File: fichier.txt
                        <br />
                        Size: 4096      Blocks: 8     IO Block: 4096
                        <br />
                        Access: (0644/-rw-r--r--)  Uid: (1000/user)  Gid: (1000/user)
                    </span>
                </pre>
                <span className="output d-block">
                    ➜ affiche les permissions sous forme numérique et symbolique.
                </span>
            </>
        ),
    },
    {
        id: "packages",
        title: "Gestion et installation de paquets (Ubuntu/Debian)",
        icon: "📦",
        content: (
            <>
                <p className="mb-1"><strong>Mettre à jour la liste des paquets disponibles</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">sudo apt update</span>
                    <span className="output">Atteint :1 http://fr.archive.ubuntu.com/ubuntu jammy InRelease</span>
                    <span className="output">Lecture des listes de paquets... Fait</span>
                </pre>

                <p className="mb-1 mt-4"><strong>Mettre à jour tous les paquets installés</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">sudo apt upgrade</span>
                    <span className="output">Les paquets suivants seront mis à jour : ...</span>
                    <span className="output">Souhaitez-vous continuer ? [O/n]</span>
                </pre>

                <p className="mb-1 mt-4"><strong>Installer un paquet</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">sudo apt install htop</span>
                    <span className="output">Lecture des listes de paquets... Fait</span>
                    <span className="output">Installation de htop ...</span>
                </pre>

                <p className="mb-1 mt-4"><strong>Supprimer un paquet</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">sudo apt remove htop</span>
                    <span className="output">Suppression de htop ...</span>
                </pre>

                <p className="mb-1 mt-4"><strong>Supprimer un paquet + fichiers de configuration</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">sudo apt purge htop</span></pre>

                <p className="mb-1 mt-4"><strong>Rechercher un paquet</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">apt search nginx</span>
                    <span className="output">nginx/jammy 1.18.0-6ubuntu14 amd64</span>
                    <span className="output">  petit serveur HTTP haute performance</span>
                </pre>

                <p className="mb-1 mt-4"><strong>Obtenir des informations sur un paquet</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">apt show nginx</span>
                    <span className="output">Package: nginx</span>
                    <span className="output">Version: 1.18.0-6ubuntu14</span>
                    <span className="output">Description: petit serveur HTTP haute performance</span>
                </pre>

                <p className="mb-1 mt-4"><strong>Lister les paquets installés</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">dpkg -l</span>
                    <span className="output">ii  bash   5.1-6ubuntu1   amd64   GNU Bourne Again SHell</span>
                    <span className="output">ii  coreutils 8.32-4.1ubuntu1 amd64  GNU core utilities</span>
                </pre>

                <p className="mb-1 mt-4"><strong>Installer un paquet .deb téléchargé</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">sudo dpkg -i logiciel.deb</span>
                    <span className="output">Sélection du paquet logiciel précédemment désélectionné.</span>
                    <span className="output">Installation de logiciel ...</span>
                </pre>

                <p className="mb-1 mt-4"><strong>Corriger les dépendances manquantes</strong></p>
                <pre className="terminal"><span className="prompt">user@user-ubuntu:~$</span> <span className="command">sudo apt -f install</span></pre>
            </>
        ),
    },
    {
        id: "netplan",
        title: "Réseau avec Netplan",
        icon: "🕸️",
        content: (
            <>
                <p className="mb-1">
                    <strong>Principe</strong>
                    : Netplan utilise des fichiers <code>YAML</code> dans <code>/etc/netplan/</code> et applique la config via <code>systemd-networkd</code> (serveur) ou <code>NetworkManager</code> (desktop).
                </p>

                <hr className="my-4" />

                <p className="mb-1">
                    <strong>1) Lister les interfaces</strong>
                </p>
                <pre className="terminal">
                    <span className="prompt">user@ubuntu:~$</span>{" "}
                    <span className="command">ip a</span>
                </pre>
                <span className="output d-block mb-2">
                    ➜ utile pour connaître le nom des interfaces pour la construction du fichier par la suite.
                </span>

                <p className="mb-1 mt-4">
                    <strong>2) Créer/éditer un fichier Netplan</strong>
                </p>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">nano /etc/netplan/01-netcfg.yaml</span>
                </pre>
                <span className="d-block mb-2">
                    ➜ Sauvegarde conseillée : <code>cp /etc/netplan/*.yaml /etc/netplan/backup/ -a</code>
                </span>

                <p className="mb-1 mt-4"><strong>Exemple DHCP</strong></p>
                <pre>
                    <code className="language-yaml">
                        {`network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: true`}
                    </code>
                </pre>

                <p className="mb-1"><strong>Exemple IP statique</strong></p>
                <pre>
                    <code className="language-yaml">
                        {`network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      addresses: [192.168.10.50/24]
      gateway4: 192.168.10.1
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8]`}
                    </code>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>3) Valider et appliquer</strong>
                </p>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">netplan generate</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">netplan try</span>
                    <span className="output">
                        ↳ applique temporairement (rollback auto si tu ne confirmes pas)
                    </span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">netplan apply</span>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>4) Vérifier</strong>
                </p>
                <pre className="terminal">
                    <span className="prompt">user@ubuntu:~$</span>{" "}
                    <span className="command">ip a</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">user@ubuntu:~$</span>{" "}
                    <span className="command">ip route</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">user@ubuntu:~$</span>{" "}
                    <span className="command">resolvectl status</span>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>Commandes utiles</strong>
                </p>
                <ul>
                    <li><code>netplan get</code> → affiche la configuration effective</li>
                    <li><code>netplan set &lt;clé=valeur&gt;</code> → change un paramètre à la volée (ex : <code>netplan set ethernets.enp0s3.dhcp4=true</code>)</li>
                    <li><code>journalctl -u systemd-networkd</code> → logs réseau (renderer networkd)</li>
                    <li><code>nmcli</code> → gestion via NetworkManager (si renderer=NetworkManager)</li>
                </ul>
            </>
        ),
    },
    {
        id: "apache-vhost",
        title: "Apache2 : VirtualHost + test curl",
        icon: "🌐",
        content: (
            <>
                <p className="mb-1">
                    <strong>1) Installer Apache2</strong>
                </p>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">apt update &amp;&amp; apt install -y apache2</span>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>2) Créer la racine du site</strong>
                </p>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">mkdir -p /var/www/monsite/public_html</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">sh -c 'echo "Hello monsite" &gt; /var/www/monsite/public_html/index.html'</span>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>3) Déclarer le VirtualHost</strong> (fichier de base)
                </p>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">nano /etc/apache2/sites-available/monsite.conf</span>
                </pre>
                <span className="output d-block mb-2">
                    ➜ Fichier de base :
                </span>
                <pre className="terminal">
                    <code className="language-apache">
                        {`# /etc/apache2/sites-available/monsite.conf
<VirtualHost *:80>
    ServerName monsite.local
    DocumentRoot /var/www/monsite/public_html

    <Directory /var/www/monsite/public_html>
        Require all granted
        AllowOverride All
        Options -Indexes
    </Directory>
</VirtualHost>`}
                    </code>
                </pre>

                <p className="mb-1 mt-4">
                    <strong>4) Activer et recharger</strong>
                </p>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">a2ensite monsite</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">apachectl -t</span>
                    <span className="output">Syntax OK</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">systemctl reload apache2</span>
                </pre>

                <hr className="my-4" />

                <p className="mb-1">
                    <strong>5) Tester avec curl</strong> (sans modifier /etc/hosts)
                </p>
                <pre className="terminal">
                    <span className="prompt">user@ubuntu:~$</span>{" "}
                    <span className="command">curl --resolve monsite.local:80:127.0.0.1 http://monsite.local/</span>
                    <span className="output">Hello monsite</span>
                </pre>
                <span className="d-block mb-2">
                    ➜ Alternative : <code>curl -H "Host: monsite.local" http://127.0.0.1/</code>
                </span>

                <p className="mb-1">
                    <strong>(Option) Résolution locale</strong> (si tu préfères éditer <code>/etc/hosts</code>)
                </p>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">echo "127.0.0.1 monsite.local" &gt;&gt; /etc/hosts</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">user@ubuntu:~$</span>{" "}
                    <span className="command">curl http://monsite.local/</span>
                    <span className="output">Hello monsite</span>
                </pre>

                <hr className="my-4" />

                <p className="mb-1"><strong>Commandes utiles</strong></p>
                <ul>
                    <li><code>a2ensite monsite</code> / <code>a2dissite monsite</code> → activer/désactiver un vhost</li>
                    <li><code>a2enmod rewrite</code> → activer mod_rewrite (si besoin)</li>
                    <li><code>apachectl -t</code> → tester la syntaxe</li>
                    <li><code>systemctl reload apache2</code> → recharger la conf</li>
                    <li><code>tail -f /var/log/apache2/access.log</code> → vérifier les accès</li>
                </ul>
            </>
        ),
    },
    {
        id: "ssh",
        title: "Accès à distance SSH",
        icon: "🔑",
        content: (
            <>
                <p className="mb-1">
                    <strong>SSH (basique, mot de passe)</strong>
                </p>

                <p className="mb-1">1) Installer et démarrer le serveur SSH</p>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">apt update &amp;&amp; apt install -y openssh-server</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">systemctl enable --now ssh</span>
                </pre>

                <p className="mb-1">2) Ouvrir le pare-feu (si UFW actif)</p>
                <pre className="terminal">
                    <span className="prompt">root@ubuntu:~#</span>{" "}
                    <span className="command">ufw allow OpenSSH</span>
                </pre>

                <p className="mb-1">3) Se connecter depuis un client</p>
                <pre className="terminal">
                    <span className="prompt">user@client:~$</span>{" "}
                    <span className="command">ssh utilisateur@serveur</span>
                </pre>

                <hr className="my-4" />

                <p className="mb-1">
                    <strong>SSH avancé (sans mot de passe, clé)</strong>
                </p>

                <p className="mb-1">1) Générer une paire de clés (sur le client)</p>
                <pre className="terminal">
                    <span className="prompt">user@client:~$</span>{" "}
                    <span className="command">ssh-keygen -t ed25519 -C "user@client"</span>
                </pre>

                <p className="mb-1">2) Copier la clé publique sur le serveur</p>
                <pre className="terminal">
                    <span className="prompt">user@client:~$</span>{" "}
                    <span className="command">ssh-copy-id utilisateur@serveur</span>
                </pre>

                <p className="mb-1">3) Se connecter sans mot de passe</p>
                <pre className="terminal">
                    <span className="prompt">user@client:~$</span>{" "}
                    <span className="command">ssh utilisateur@serveur</span>
                </pre>

                <p className="mb-1">4) Permissions correctes (sur le serveur)</p>
                <pre className="terminal">
                    <span className="prompt">utilisateur@serveur:~$</span>{" "}
                    <span className="command">chmod 700 ~/.ssh &amp;&amp; chmod 600 ~/.ssh/authorized_keys</span>
                </pre>

                <hr className="my-4" />

                <p className="mb-1"><strong>Vérifier / diagnostiquer</strong></p>
                <pre className="terminal">
                    <span className="prompt">user@client:~$</span>{" "}
                    <span className="command">ssh -v utilisateur@serveur</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">root@serveur:~#</span>{" "}
                    <span className="command">systemctl status ssh</span>
                </pre>
                <pre className="terminal">
                    <span className="prompt">root@serveur:~#</span>{" "}
                    <span className="command">journalctl -u ssh</span>
                </pre>

                <hr className="my-4" />

                <p className="mb-1"><strong>Options utiles</strong></p>
                <ul>
                    <li><code>ssh -i ~/.ssh/id_ed25519 utilisateur@serveur</code> → forcer une clé spécifique</li>
                    <li><code>/etc/ssh/sshd_config</code> → fichier de config serveur (ex. <code>PasswordAuthentication</code>, <code>PermitRootLogin</code>)</li>
                    <li><code>systemctl reload ssh</code> → recharger la conf après modification</li>
                </ul>
            </>
        ),
    },
];

export default function LinuxPage({ contrastClass, onToggleTheme, theme }) {
    return (
        <PageWithTocAccordion
            title="📘 Commandes Linux de base"
            toc={toc}
            items={items}
            accordionId="linuxAccordion"
            contrastClass={contrastClass}
            singleOpen={false}
            showFloatingControls={true}
            onToggleTheme={onToggleTheme}
            theme={theme}
        />
    );
}
