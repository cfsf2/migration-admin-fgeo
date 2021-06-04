const defaultState = {
   mis_pedidos: [],
   ver_pedido:{},
   socio:null
};

export default (state = defaultState, action) => {
    switch (action.type){
        case 'GET_PEDIDOS':
            return{
                ...state,
                mis_pedidos: action.payload
            }
        case 'VER_PEDIDO':
            return{
                ...state,
                ver_pedido: action.payload
            }
        case 'GET_INFO_SOCIO':
            return{
                ...state,
                socio: action.payload
            }
        case 'LOGOUT':
            return{
                mis_pedidos: [],
                ver_pedido:{},
                socio:null
            }
        default:
                return state;                  
    }   
}

