const defaultState = {
    lista_denuncias: [],
 };
 
 export default (state = defaultState, action) => {
     switch (action.type){
         case 'GET_ALL_DENUNCIAS':
             return{
                 ...state,
                 lista_denuncias: action.payload
             }
        case 'LOGOUT':
            return{
                ...state,
                lista_denuncias: []
            }
         default:
                 return state;                  
     }   
 }
 
 