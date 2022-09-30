import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';

import { UPDATE_FARMACIA } from '../../redux/actions/farmaciaActions'
import { connect } from 'react-redux'

class Mediospagos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmaciaProfile: null,
      tarjetas: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
  }

  componentDidMount(){
    this.setState({
      farmaciaProfile: this.props.authReducer.userprofile,
      tarjetas:this.props.authReducer.userprofile.mediospagos
    })
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if(value){
      await this.setState({ 
        tarjetas: this.state.tarjetas.concat(name)
      })
    }else{
      await this.setState({
        tarjetas: this.state.tarjetas.filter(t => {return t !== name})
      })
    }
    // console.log(this.state.farmaciaProfile)
  }  

  handleEditProfile(){
    //console.log({...this.state.farmaciaProfile, mediospagos: this.state.tarjetas})
    this.props.UPDATE_FARMACIA(
      {
        ...this.state.farmaciaProfile,
         mediospagos: this.state.tarjetas
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Medios de pago</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <Row>

                      <Col xs="6" md="3" className="my-4">
                        <div align="center" >
                          <img src={require('../../assets/images/visa.png')} style={{width:50}} />
                          <p>Visa</p>
                          <input 
                            type="checkbox" 
                            id="visa" 
                            name="visa" 
                            onChange={this.handleInputChange} 
                            checked={this.state.tarjetas.includes('visa')}
                            /> 
                        </div>
                      </Col>

                      <Col xs="6" md="3" className="my-4">
                        <div align="center">
                          <img src={require('../../assets/images/mastercard.png')} style={{width:50}} />
                          <p style={{marginTop:10}}>Mastercard</p>
                          <input 
                            type="checkbox" 
                            id="mastercard"
                            name="mastercard" 
                            onChange={this.handleInputChange} 
                            checked={this.state.tarjetas.includes('mastercard')}
                            /> 
                        </div>
                      </Col>

                      <Col xs="6" md="3" className="my-4">
                        <div align="center" >
                          <img src={require('../../assets/images/002-american-express.png')} style={{width:50}} />
                          <p>American Express</p>
                          <input 
                            type="checkbox" 
                            id="american" 
                            name="american"
                            onChange={this.handleInputChange} 
                            checked={this.state.tarjetas.includes('american')}
                          /> 
                        </div>
                      </Col>

                      <Col xs="6" md="3" className="my-4">
                        <div align="center" style={{marginTop:10}}>
                          <img src={require('../../assets/images/cabal_credito.png')} style={{width:90}} />
                          <p  style={{marginTop:10}}>Cabal</p>
                          <input 
                            type="checkbox" 
                            id="cabal" 
                            name="cabal" 
                            onChange={this.handleInputChange} 
                            checked={this.state.tarjetas.includes('cabal')}
                          /> 
                        </div>
                      </Col>
                   
                    </Row>
                  </Col>
                </Row>

                <Row style={{marginTop:30}}>
                  <Col xs="12">
                    <Row>
                    <Col xs="6" md="3" className="my-4">
                        <div align="center" >
                          <img src={require('../../assets/images/Como_ingresar_a_mi_cuenta_de_tarjeta_naranja.png')} style={{width:70}} />
                          <p></p>
                          <input 
                            type="checkbox" 
                            id="naranja" 
                            name="naranja"
                            onChange={this.handleInputChange} 
                            checked={this.state.tarjetas.includes('naranja')}
                          /> 
                        </div>
                      </Col>

                      <Col xs="6" md="3" className="my-4">
                        <div align="center" >
                          <img src={require('../../assets/images/pluspagos.png')} style={{width:120, marginTop:10}} />
                          <p></p>
                          <input 
                            type="checkbox" 
                            id="pluspagos" 
                            name="pluspagos" 
                            onChange={this.handleInputChange} 
                            checked={this.state.tarjetas.includes('pluspagos')}
                            /> 
                        </div>
                      </Col>

                      <Col xs="6" md="3" className="my-4">
                        <div align="center">
                          <img src={require('../../assets/images/todopago.png')} style={{width:80}} />
                          <p ></p>
                          <input 
                            type="checkbox" 
                            id="todopago"
                            name="todopago" 
                            onChange={this.handleInputChange} 
                            checked={this.state.tarjetas.includes('todopago')}
                            /> 
                        </div>
                      </Col>

                      <Col xs="6" md="3" className="my-4">
                        <div align="center" >
                          <img src={require('../../assets/images/mercadopago.png')} style={{width:50}} />
                          <p></p>
                          <input 
                            type="checkbox" 
                            id="mercadopago" 
                            name="mercadopago"
                            onChange={this.handleInputChange} 
                            checked={this.state.tarjetas.includes('mercadopago')}
                          /> 
                        </div>
                      </Col>

                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          </Row>
        <Row>
          <Col>
            <Button style={{float:"right", backgroundColor:'#00D579', color:'white', marginRight: "20px"}} onClick={this.handleEditProfile}>Guardar</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer
  }
}
const mapDispatchToProps = {
  UPDATE_FARMACIA
}

export default connect(mapStateToProps, mapDispatchToProps)(Mediospagos)
