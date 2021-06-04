import axios from 'axios';
import { errorParser } from "../../helpers/errorHelper"
import { wp_api, farmageo_api, wp_api_auth } from '../../config'

export const ADD_UPDATE_IMAGE = (image) => {
    return (dispatch) => {
      dispatch(
          { 
            type: 'ADD_UPDATE_IMAGE',
            payload: image
          }
        );
    }  
  }