import axios from 'axios';
import { wp_api, farmageo_api } from '../../config'

export const GET_PRODUCTO = (id) => {
  return (dispatch) => {
    axios.get(farmageo_api+'/productos/'+id,{})
    .then(function (response) {
      dispatch({
        type: 'GET_PRODUCTO',
        payload: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export const GET_PRODUCTOS = (farmaciaid, token) => {
  return (dispatch) => {
    axios.get(farmageo_api + '/farmacias/' + farmaciaid + '/productos/', {})
    .then(function (response) {
      dispatch({
        type: 'GET_PRODUCTOS',
        payload: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export const OPEN_MODAL_ADDEDIT = () => { 
  return (dispatch) => {
    dispatch({ type: 'OPEN_MODAL_ADDEDIT' });
  }
}

export const CLOSE_MODAL_ADDEDIT = () => { 
  return (dispatch) => {
    dispatch({ type: 'CLOSE_MODAL_ADDEDIT' });
  }
}
