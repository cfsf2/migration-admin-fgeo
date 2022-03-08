import React from "react";
import { FormGroup, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Label } from 'reactstrap';    
import { connect } from 'react-redux';
import './Modal.scss';

class AddEditModal extends React.Component {
    constructor(props) {
        super(props);
    }
  
    closeModal() {
       
    }    

    render() {
          
        return (
            <div>
                <Modal isOpen={this.props.show} toggle={this.toggle}>
                    <ModalHeader><h4>PRODUCTOS - </h4></ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input type="text" id="name" placeholder="Nombre del producto" required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="name">SKU</Label>
                                    <Input type="text" id="name" placeholder="Codigo SKU" required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs="5">
                                <FormGroup>
                                    <Label htmlFor="ccmonth">Inventario</Label>
                                    <Input type="select" name="ccmonth" id="ccmonth">
                                        <option value="Hay existencias">Hay existencias</option>
                                        <option value="Pocas existencias">Pocas existencias</option>
                                        <option value="No hay existencias">No hay existencias</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="4">
                                <FormGroup>
                                    <Label htmlFor="name">Precio</Label>
                                    <Input type="text" id="name" placeholder="Precio" required />
                                </FormGroup>
                            </Col>
                            <Col xs="3">
                                <FormGroup check className="checkbox">                                    
                                    <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="favorito" />
                                    <Label check className="form-check-label" htmlFor="checkbox1">Favorito</Label>                                                                        
                                </FormGroup>
                            </Col>                                                        
                        </Row>                                               
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" >Cancelar</button>
                        <button className="btn btn-success" >Aceptar</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
    }
  }

const mapDispatchToProps = {
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal)