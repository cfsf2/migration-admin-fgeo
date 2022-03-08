const defaultState = {
    lista_debitos:[]
 };
 
 export default (state = defaultState, action) => {
     switch (action.type){
         case 'GET_DEBITOS':
             console.log(action)
             return{
                 ...state,
                 lista_debitos: action.payload
             }
         default:
                 return state;                  
     }   
 }
 
 