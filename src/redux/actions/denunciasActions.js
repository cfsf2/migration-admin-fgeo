import axios from 'axios';
import { farmageo_api, wp_api_auth } from '../../config'

export const GET_ALL_DENUNCIAS = () => {
  return (dispatch) => {
    axios.get( farmageo_api + '/denuncias')
    .then(function (response) {
      //console.log(response)
      dispatch({ type: 'GET_ALL_DENUNCIAS', payload: response.data })
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}