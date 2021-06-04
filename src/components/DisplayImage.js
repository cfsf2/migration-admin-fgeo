import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {
  CardImg,
  Button,
  Form,
  Input,
} from 'reactstrap';
import { wp_api, farmageo_api, wp_api_auth, image_path_server } from '../config'

import './displayimg.css'

class DisplayImage extends Component {  
  render() {
    const { nuevaimagen, imagen } = this.props;
    const showImagen = (nuevaimagen != null && nuevaimagen != '') || (imagen != null && imagen != '')
    var imagenToShow = ''

    if(showImagen) imagenToShow = nuevaimagen != null && nuevaimagen != '' ? image_path_server + nuevaimagen :  image_path_server + imagen 

    // console.log(showImagen)
    // console.log(imagenToShow)

    return (
      <React.Fragment>
        <div className='preview-container'>
            <React.Fragment>
              <div className='preview'>
                <CardImg top width="100%" src={imagenToShow} alt="vista previa" />
              </div>
            </React.Fragment>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    nuevaimagen: state.imageReducer.imagen,
    imagen: state.authReducer.userprofile.imagen
  }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayImage)