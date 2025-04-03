import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";

import { AppAside } from "@coreui/react";
import Pantalla from "views/Pantalla/Pantalla";

// const DefaultAside = React.lazy(() => import("./DefaultAside"));

function PublicLayout(props) {
  function loading() {
    return <div className="animated fadeIn pt-1 text-center">Cargando...</div>;
  }

  return (
    <div className="app">
      <div className="app-body">
        <main id="PUBLIC_MAIN" className="main">
          <Container fluid className="mx-1 px-0">
            <Suspense fallback={loading()}>
              <Pantalla />
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={loading()}>
            
          </Suspense>
        </AppAside>
      </div>
    </div>
  );
}

export default connect()(PublicLayout);
