import React, { Component } from 'react';
import AddEditModal from './modal/AddEditModal'
import { Alert, DropdownMenu, ButtonDropdown, DropdownToggle, DropdownItem, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux'
import { GET_PRODUCTOS, OPEN_MODAL_ADDEDIT } from '../../redux/actions/productoAction'

class Productos extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
      showModal: false,
      currentPage: 0,
      dropdownOpen: []
    };
    this.props.GET_PRODUCTOS(this.props.farmaciaid, this.props.token)

    this.pageSize = 50;
    this.pagesCount = Math.ceil(this.props.productos.length / this.pageSize);
  }

  openModal() {
    this.props.OPEN_MODAL_ADDEDIT()
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  RenderFavoritos(fav) {
    if (fav) {
      return (
        <i className="fa fa-star fa-3x"></i>
      );
    }
    return (
      <i className="fa fa-star-o fa-3x"></i>
    );
  }

  RenderInventario(inventario) {
    if (inventario === "Hay existencias") {
      return (
        <p className="inventariohay">{inventario}</p>
      );
    }
    if (inventario === "Pocas existencias") {
      return (
        <p className="inventariopocas">{inventario}</p>
      );
    }
    return (
      <p className="inventariosin">{inventario}</p>
    );
  }

  RenderBotonera() {
    return (
      <div className="grid-botonera">
        <p><a href="#">Editar</a> | <a href="#">Enviar a papelera</a> | <a href="#">Duplicar</a></p>
      </div>
    )
  }

  handlePaginationClick(e, index) {

    e.preventDefault();

    this.setState({
      currentPage: index
    });

  }

  render() {
    const { productos } = this.props
    const { currentPage } = this.state;


    return (
      <div className="animated fadeIn">
        <AddEditModal
          titulo="Productos"
          onClose={() => this.setState({ showModal: true })}
        />
        <Row>
          <Col sm="5">
          </Col>
          <Col sm="7">
            <Alert color="danger">
              <Row>
                <Col sm="1"><i className="fa fa-exclamation-circle fa-3x icon-exclamation-alert"></i></Col>
                <Col sm="11">Recordar. Prohibido promocionar medicamentos<br />Por favor consultar nuestros <a href="#" className="alert-link">términos legales</a> de uso.</Col>
              </Row>
            </Alert>
          </Col>
        </Row>

        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Button onClick={() => { this.openModal() }}><i className="fa fa-plus"></i></Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                  <DropdownToggle caret color="secondary">
                    Filtrar por estado
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Habilitado</DropdownItem>
                    <DropdownItem>Deshabilitado</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                &nbsp;&nbsp;&nbsp;
                <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1); }}>
                  <DropdownToggle caret color="secondary">
                    Filtrar por inventario
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Pocas existencias</DropdownItem>
                    <DropdownItem>Sin existencias</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th><i className="icon-picture icons font-2xl"></i></th>
                      <th>Nombre</th>
                      <th>SKU</th>
                      <th>Inventario</th>
                      <th>Precio</th>
                      <th>Favorito</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map(producto => (
                      <tr>
                        <td className="iconcol"><img className="image-prodgrid" src={producto.imagen} /></td>
                        <td>
                          <div className="grid-prod-name expanded">{producto.nombre}</div>
                          {this.RenderBotonera()}
                        </td>
                        <td>{producto.sku}</td>
                        <td>{this.RenderInventario(producto.inventario)}</td>
                        <td>{producto.precio}</td>
                        <td className="iconcol">
                          {this.RenderFavoritos(producto.favorito)}
                        </td>
                        <td>
                          {producto.fecha}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink
                      onClick={e => this.handlePaginationClick(e, currentPage - 1)}
                      previous
                      href="#"
                    />
                  </PaginationItem>
                  {[...Array(this.pagesCount)].map((page, i) =>
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink onClick={e => this.handlePaginationClick(e, i)} href="#">
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                    <PaginationLink
                      onClick={e => this.handlePaginationClick(e, currentPage + 1)}
                      next
                      href="#"
                    />
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    productos: state.productoReducer.productos,
    farmaciaid: state.authReducer.user.username,
    token: state.authReducer.user.token
  }
}
const mapDispatchToProps = {
  GET_PRODUCTOS, OPEN_MODAL_ADDEDIT
}
export default connect(mapStateToProps, mapDispatchToProps)(Productos)
