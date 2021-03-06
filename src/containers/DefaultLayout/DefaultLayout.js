import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container, Col, Row } from "reactstrap";

import { LOGOUT } from "../../redux/actions/authActions";
import { ALERT } from "../../redux/actions/alertActions";
import store from "../../redux/store/index";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import nav_farmacia from "../../_nav_farmacia";
import nav_admin from "../../_nav_admin";
import nav_default from "../../_nav_default";
// routes config
import routesfarmacias from "../../routes";
import routesadmin from "../../routesadmin";
import routesdefault from "../../routesdefault";

import { Filtrar_Sin_Venta_Online } from "../../helpers/NavHelper";
import { ValidarPerfil } from "../../helpers/Validaciones";

import axios from "axios";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

axios.interceptors.request.use((request) => {
  request.headers.authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return request;
});

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    switch (err.response.status) {
      case 401:
        // alert("Denegado: No tiene permiso para realizar esta accion");
        store.dispatch(
          ALERT(
            "ACCESO DENEGADO",
            "Usted no tiene acceso suficiente. Consulte con su administrador.",
            "error",
            "OK"
          ).finally(() => {
            window.location = process.env.PUBLIC_URL;
          })
        );

        break;
      case 440:
        //alert("Su sesion ha expirado, debe loguearse de nuevo");
        store.dispatch(
          ALERT(
            "SESION EXPIRADA",
            "Su sesion ha expirado debe loguearse nuevamente",
            "error",
            "OK"
          ).finally(() => {
            store.dispatch(LOGOUT());
          })
        );

      default:
        break;
    }

    return err.response;
  }
);

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: nav_default,
      routes: routesdefault,
    };
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.LOGOUT();
    this.props.history.push("/login");
  }

  getComponent(route, idx) {
    return route.component ? (
      <Route
        key={idx}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) =>
          this.props.islogin ? (
            <route.component {...props} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )
        }
      />
    ) : null;
  }

  async componentDidMount() {
    const { IS_ADMIN, IS_FARMACIA } = this.props.user;
    const { userprofile } = this.props.authReducer;
    if (IS_ADMIN) {
      let allowedNav = { items: [] };
      let allowedRoutes;
      allowedNav.items = nav_admin.items.filter((route) => {
        return this.props.user.permisos.some((per) => route.permiso === per);
      });
      allowedRoutes = routesadmin.filter((route) => {
        return this.props.user.permisos.some((per) => {
          return route.permiso === per;
        });
      });

      this.setState({ navigation: allowedNav, routes: allowedRoutes });
    } else if (IS_FARMACIA) {
      var _nav_farmacia = await Filtrar_Sin_Venta_Online(
        nav_farmacia,
        userprofile
      );
      this.setState({ navigation: _nav_farmacia, routes: routesfarmacias });
    } else {
      this.setState({ navigation: nav_default, routes: routesdefault });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { IS_ADMIN, IS_FARMACIA } = this.props.user;
    const { userprofile } = this.props.authReducer;

    if (
      prevProps.user.IS_ADMIN !== this.props.user.IS_ADMIN ||
      prevProps.user.IS_FARMACIA !== this.props.user.IS_FARMACIA ||
      prevProps.authReducer.userprofile !== userprofile
    ) {
      if (IS_ADMIN) {
        let allowedNav = { items: [] };
        let allowedRoutes;
        allowedNav.items = nav_admin.items.filter((route) => {
          return this.props.user.permisos.some((per) => route.permiso === per);
        });
        allowedRoutes = routesadmin.filter((route) => {
          return this.props.user.permisos.some((per) => {
            return route.permiso === per;
          });
        });

        this.setState({ navigation: allowedNav, routes: allowedRoutes });
      } else if (IS_FARMACIA) {
        var _nav_farmacia = await Filtrar_Sin_Venta_Online(
          nav_farmacia,
          userprofile
        );
        this.setState({ navigation: _nav_farmacia, routes: routesfarmacias });
      } else {
        this.setState({ navigation: nav_default, routes: routesdefault });
      }
    }
  }

  render() {
    // const navigation = this.props.user.IS_ADMIN ? nav_admin : nav_farmacia;
    // const routes = this.props.user.IS_ADMIN ? routesadmin : routesfarmacias
    const { userprofile } = this.props.authReducer;
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={this.state.navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/*<AppBreadcrumb appRoutes={this.state.routes} router={router}/>*/}
            <Container fluid className="mx-0 px-0">
              <Row
                className="py-2 mb-2 px-3"
                style={{ backgroundColor: "#00788f" }}
              >
                {userprofile && userprofile.esfarmacia ? (
                  userprofile.perfil_farmageo !== "solo_visible" ||
                  userprofile.perfil_farmageo === "no_visible" ? (
                    <Col md="8">
                      <a
                        href={process.env.PUBLIC_URL + "/#/perfilfarmageo"}
                        className="text-warning"
                      >
                        <b style={{ float: "left", fontSize: 10 }}>
                          SU FARMACIA SE ENCUENTRA DESHABILITADA EN NUESTRA
                          APLICACI??N Y SISTEMA DE VENTA ONLINE. S??LO PUEDE
                          GESTIONAR TRANSFERS Y OTROS SERVICIOS INTERNOS.
                        </b>
                      </a>
                    </Col>
                  ) : ValidarPerfil(userprofile) ? null : (
                    <Col md="8">
                      <a
                        href={process.env.PUBLIC_URL + "/#/perfil"}
                        className="text-warning"
                      >
                        <b style={{ float: "left", fontSize: 10 }}>
                          ATENCI??N: hay campos sin completar en la informaci??n
                          de su perfil
                        </b>
                      </a>
                    </Col>
                  )
                ) : null}

                <Col className="align-content-center">
                  <b style={{ float: "right", color: "white" }}>
                    {this.props.user.user_display_name}
                  </b>
                </Col>
              </Row>
            </Container>
            <Container fluid className="mx-1 px-1">
              <Suspense fallback={this.loading()}>
                <Switch>
                  {this.state.routes.map((route, idx) => {
                    return this.getComponent(route, idx);
                  })}
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    islogin: state.authReducer.user.islogin,
    user: state.authReducer.user,
    authReducer: state.authReducer,
  };
};
const mapDispatchToProps = {
  LOGOUT,
  ALERT,
};
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
