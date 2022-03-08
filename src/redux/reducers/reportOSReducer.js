const defaultState = {
    oossInactivas: [],
    avaliable: false,
    _id: "",
    alert: "",
    attachName: "",
    mimetype: "",
    createdAt: "",
    updatedAt: "",
    __v: 0
}



export default (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_REPORTE_OOSS':
            return action.payload
        case 'NEW_REPORT_OOSS':
            return action.payload
            
        default:
            return state;
    }
}
    