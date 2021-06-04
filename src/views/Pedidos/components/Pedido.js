import React, { Component, Fragment } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter 
} from 'reactstrap';
import { connect } from 'react-redux'
import MyModal from './Modal';

class Pedido extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: false
      }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    console.log("hello");
    this.setState({
      showModal: !this.state.showModal
    })
  }
 
  render() {
    const { p } = this.props;
    var color='green';
    switch(p.estado){
        case 'nuevo':
            color='#00D579';
            break;
        case 'enproceso':
            color='yellow';
            break;
        case 'entregado':
            color= 'blue'
            break;
    }

    return (
      <Fragment>
        <Row>
            <Col md="3" align="center">{p.descripcion}</Col>
            <Col md="2" align="center">{p.fechaalta.substring(0,10)} </Col>
            <Col md="3" align="center">{p.envio ? p.domicilioenvio : 'Farmacia'}</Col>
            <Col md="1" align="center">
                <div style={{backgroundColor:color, color:'white'}}>
                {p.estado}
                </div>
            </Col>
            <Col md="2" align="center">{p.gruposproductos[0].precio != null ? p.gruposproductos[0].precio : 'A confirmar'}</Col>
            <Col md="1" align="center">
                <MyModal
                    componente={p._id}
                    titulo='ver'
                    className="btn btn-secondary"            
                    id={p._id}            
                />
            </Col>
        </Row>
        <hr/>
    </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Pedido)