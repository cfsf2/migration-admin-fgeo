const defaultState = {
    imagen: '',
    error: {}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_UPDATE_IMAGE':
            return{
                ...state,
                imagen: action.payload
            }
        case 'LOGOUT':
            return{
                imagen: '',
                error: {}
            }            
        default:
            return state;
    }
};