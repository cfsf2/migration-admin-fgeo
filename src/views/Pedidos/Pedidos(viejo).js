import React, { Component } from 'react';
import { Alert, DropdownMenu, ButtonDropdown, DropdownToggle, DropdownItem, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import pedidos from './pedidos.json'

class Pedidos extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
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
        <p class="inventariohay">{inventario}</p>
      );
    }
    if (inventario === "Pocas existencias") {
      return (
        <p class="inventariopocas">{inventario}</p>
      );
    }
    return (
      <p class="inventariosin">{inventario}</p>
    );
  }

  RenderBotonera(){
    return (
      <div className="grid-botonera">
        <p><a href="#">Editar</a> | <a href="#">Enviar a papelera</a> | <a href="#">Duplicar</a></p>
      </div>      
    )
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="5">            
          </Col>
          <Col sm="7">
            <Alert color="danger">
              {/*eslint-disable-next-line*/}
              <Row>
                <Col sm="1"><i className="fa fa-exclamation-circle fa-3x icon-exclamation-alert"></i></Col>
                <Col sm="11">Recordar. Prohibido promocionar medicamentos<br/>Por favor consultar nuestros <a href="#" className="alert-link">términos legales</a> de uso.</Col>
              </Row>                            
            </Alert>
          </Col>
        </Row>

        <Row>                    
          <Col xs="12" lg="12">            
            <Card>
              <CardHeader>
                <Button><i className="fa fa-plus"></i></Button>
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
                  {pedidos.map(producto => (
                    <tr>
                      <td class="iconcol"><img className="image-prodgrid" src={producto.imagen} /></td>
                      <td>
                        <div className="grid-prod-name expanded">{producto.nombre}</div>
                        {this.RenderBotonera()}
                      </td>
                      <td>{producto.sku}</td>
                      <td>{this.RenderInventario(producto.inventario)}</td>
                      <td>{producto.precio}</td>
                      <td class="iconcol">
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
                  <PaginationItem><PaginationLink previous tag="button">Previo</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Siguiente</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>

    );
  }
}

export default Pedidos;
