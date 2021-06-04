import axios from 'axios';
import { wp_api } from '../../config'

export const GET_USUARIO = (userid) => {
  return (dispatch) => {
    axios.get( wp_api + '/users/' + userid,{})
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

export const GET_USUARIOS = (token) => {
  return (dispatch) => {
    axios.get( wp_api + '/users', {})
    .then(function (response) {
      dispatch({
        type: 'GET_USUARIOS',
        payload: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}
