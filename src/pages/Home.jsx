export default function Home({ onNavigate }) {
  return (
    <section id="home" className="page-section active bg-body text-center">
      <div className="container mt-6">
        <h1 className="mb-4 mt-4">Base de connaissances TSSR</h1>

        {/* Première rangée de 3 cartes */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">📡 Configuration Routeur</h5>
                <p className="card-text">
                  Toutes les commandes utiles à la configuration d'un routeur.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => onNavigate("router_page")}
                >
                  Accéder
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">🖧 Configuration Switch</h5>
                <p className="card-text">
                  Toutes les commandes utiles à la configuration d'un switch.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => onNavigate("switch_page")}
                >
                  Accéder
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">🐧 Commandes Linux</h5>
                <p className="card-text">
                  Les commandes de base pour manipuler le terminal linux.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => onNavigate("linux_commands_page")}
                >
                  Accéder
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Deuxième rangée (1 seule carte) */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">🌐 Calculateur de réseaux</h5>
                <p className="card-text">
                  Outil complet pour obtenir les informations réseaux à partir
                  d'une adresse IP et planifier des sous-réseaux.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => onNavigate("network_page")}
                >
                  Accéder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
