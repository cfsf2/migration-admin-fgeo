import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import logo from "../../assets/img/brand/nuevo-logo-negativo.png";
import sygnet from "../../assets/img/brand/sygnet.svg";

import { Col, Row } from "reactstrap";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { user_display_name } = this.props.user;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{
            src: logo,
            width: "80%",
            height: 25,
            alt: "Farmageo",
          }}
          //minimized={{ src: logo, width: 30, height: 14, alt: "Farmageo" }}
          className="d-md-down-none"
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <a
          style={{ marginLeft: "2rem"}}
          id="colegioLogo"
          href="http://www.cfsf2.org.ar/"
          target="_blank"
        >
          <img
            src={require("../../assets/images/icons/logocfsf2-12.png")}
            style={{ width: 110, marginRight: 30 }}
          />
        </a>

        <img src={logo} style={{ width: 100 }} className="d-lg-none" />

        <Nav className="ml-auto" navbar>
          <p style={{ margin: "0 5px", padding: "10px" }}>
            {user_display_name}
          </p>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className="icon-user"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={(e) => this.props.onLogout(e)}>
                <i className="fa fa-lock"></i> Salir
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}

        {/*user_display_name*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
