import React, { Suspense, useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import * as router from "react-router-dom";
import { Container, Col, Row } from "reactstrap";

import Axios from "axios";
import { farmageo_api } from "../../config";

import { LOGOUT } from "../../redux/actions/authActions";
import { ALERT } from "../../redux/actions/alertActions";

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

import { LOADPROFILE } from "../../redux/actions/authActions";

import { Filtrar_Sin_Venta_Online } from "../../helpers/NavHelper";
import { ValidarPerfil } from "../../helpers/Validaciones";
import _nav_farmacia from "../../_nav_farmacia";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

function DefaultLayout(props) {
  const [navigation, setNavigation] = useState(nav_default);
  const [routes, setRoutes] = useState(routesdefault);
  const [userprofile, setUserProfile] = useState(props.authReducer);
  const dispatch = useDispatch();

  function loading() {
    return <div className="animated fadeIn pt-1 text-center">Cargando...</div>;
  }

  function signOut(e) {
    e.preventDefault();
    props.LOGOUT();
    props.history.push("/login");
  }

  function getComponent(route, idx) {
    return route.component ? (
      <Route
        key={idx}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => <route.component {...props} />}
      />
    ) : null;
  }

  async function componentDidMount() {
    const { IS_ADMIN, IS_FARMACIA } = props.user;
    if (IS_ADMIN) {
      let allowedNav = { items: [] };
      let allowedRoutes;
      allowedNav.items = nav_admin.items.filter((route) => {
        // console.log(route, props.user.permisos);
        return props.user.permisos.some((per) => route.permiso === per);
      });
      allowedRoutes = routesadmin.filter((route) => {
        return props.user.permisos.some((per) => {
          return route.permiso === per;
        });
      });

      // setNavigation(allowedNav);

      setRoutes(allowedRoutes);
    } else if (IS_FARMACIA) {
      // var _nav_farmacia = Filtrar_Sin_Venta_Online(nav_farmacia, userprofile);

      // setNavigation(_nav_farmacia);

      const rutasDeFarmacia = routesfarmacias?.map((route) => {
        if (route.path === "/dashboard") {
          if (!props.user.dashboard) {
            return { ...route, component: "" };
          }
        }
        return route;
      });

      setRoutes(rutasDeFarmacia);
    } else {
      // setNavigation(nav_default);
      setRoutes(routesdefault);
    }
  }

  function convertMenu(menuCriollo) {
    const m = JSON.stringify(menuCriollo);
    const nuevoMenu = JSON.parse(m, function (k, v) {
      if (k === "nombre") this.name = v;
      if (k === "nombre") {
        const vv = v.toUpperCase().replace(" ", "");
        if (
          v === "VENTAONLINE" ||
          v === "PRODUCTOS" ||
          v === "PROMOCIONES" ||
          v === "PEDIDOS"
        )
          this.perfil_farmageo = ["vender_online"];

        if (v === "MEDIOSDEPAGO" || v === "SERVICIOS" || v === "HORARIOS")
          this.perfil_farmageo = ["solo_visible"];
      } else if (k === "hijos") {
        this.children = v.length === 0 ? undefined : v;
      } else if (k === "url_imagen") this.icon = v;
      if (k === "target") {
        const attributes = {
          target: v,
          rel: "noopener",
        };
        this.attributes = attributes;
      } else if (k === "tipo") {
        if (v.id_a === "TITLE") {
          this.title = true;
        }
      } else if (k === "id_a_conf") {
        if (!v) return;
        this.url = "/Pantalla/" + v;
      } else return v;
    });
    return nuevoMenu;
  }

  useEffect(() => {
    if (localStorage.authenticated === "true") {
      props.LOADPROFILE(
        window.localStorage.getItem("user"),
        window.localStorage.getItem("token")
      );

      dispatch({
        type: "LOGIN_OK",
        payload: JSON.parse(localStorage.getItem("login")),
      });

      componentDidMount();
    }
  }, [props.user.IS_ADMIN, props.user.IS_FARMACIA, localStorage.authenticated]);

  useEffect(() => {
    if (localStorage.authenticated === "true") {
      Axios.post(farmageo_api + "/menu", { menu: "M_NAV_FARMACIA" })
        .then(async (res) => {
          const menu = convertMenu(res.data);
          if (res.status >= 300) {
            throw res.data;
          }
          try {
            setNavigation({ items: menu });
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => err);
    }
  }, [localStorage.authenticated, props.user.IS_ADMIN, props.user.IS_FARMACIA]);

  const islogin = useSelector((state) => state.authReducer.user.islogin);

  if (localStorage.authenticated !== "true" && !islogin)
    return <Redirect to="/login" />;

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={(e) => signOut(e)} />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigation} {...props} router={router} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main" style={{ backgroundColor: "white" }}>
          {/*<AppBreadcrumb appRoutes={routes} router={router}/>*/}
          {/* <Container fluid className="mx-0 px-0">
            <Row
              className="py-2 mb-2 px-3"
            > */}
          {userprofile && userprofile.esfarmacia ? (
            userprofile.perfil_farmageo !== "solo_visible" ||
            userprofile.perfil_farmageo === "no_visible" ? (
              <Col md="8">
                <a
                  href={process.env.PUBLIC_URL + "/#/perfilfarmageo"}
                  className="text-warning"
                >
                  <b style={{ float: "left", fontSize: 10 }}>
                    SU FARMACIA SE ENCUENTRA DESHABILITADA EN NUESTRA APLICACIÓN
                    Y SISTEMA DE VENTA ONLINE. SÓLO PUEDE GESTIONAR TRANSFERS Y
                    OTROS SERVICIOS INTERNOS.
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
                    ATENCIÓN: hay campos sin completar en la información de su
                    perfil
                  </b>
                </a>
              </Col>
            )
          ) : null}

          {/* <Col className="align-content-center">
                <b style={{ float: "right", color: "white" }}>
                  {props.user.user_display_name}
                </b>
              </Col> */}
          {/* </Row>
          </Container> */}
          <Container fluid className="mx-1 px-0">
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return getComponent(route, idx);
                })}
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={loading()}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
      {/* <AppFooter>
        <Suspense fallback={loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter> */}
    </div>
  );
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
  LOADPROFILE,
  ALERT,
};
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
