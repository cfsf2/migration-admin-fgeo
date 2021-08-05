const defaultState = {
    user: {
        username: null,
        user_display_name: null,
        token: null,
        islogin: false,
        roles: [],
        IS_ADMIN: false,
        IS_USER: false,
        IS_FARMACIA: false,
        user_id: null,
        userprofile: null,
    },
    error: {},
    userprofile: null
};

export default (state = defaultState, action) => {

    switch (action.type) {

        case 'LOGIN_OK':
            return {
                ...state,
                user: {
                    user_id: action.payload.user_id,
                    username: action.payload.user_nicename,
                    user_display_name: action.payload.user_display_name,
                    token: action.payload.token,
                    roles: action.payload.user_rol,
                    islogin: true,
                    IS_ADMIN: action.payload.user_rol.includes('admin'),
                    IS_USER: action.payload.user_rol.includes('user'),
                    IS_FARMACIA: action.payload.user_rol.includes('farmacia')
                }
            }

        case 'authenticated':
            return {
                ...state,
                user: {
                    ...state.user,
                    username: action.payload,
                    islogin: true,
                }
            }

        case 'LOADPROFILE_OK':
            return {
                ...state,
                userprofile: action.payload
            }

        case 'LOGOUT':
            return {
                ...state,
                user: {
                    username: null,
                    user_display_name: null,
                    token: null,
                    islogin: false,
                    roles: [],
                    IS_ADMIN: false,
                    IS_USER: false,
                    IS_FARMACIA: false,
                    user_id: null,
                    userprofile: null,
                },
                error: {},
                userprofile: null
            }

        case 'GET_USER_ROLES':
            // NO DEBERIA TOMAR DEL ESTADO LOS ROLES, DEBERIA CONSULTAR A LA API
            return {
                ...state,
                IS_ADMIN: state.user.roles.includes('admin'),
                IS_USER: state.user.roles.includes('user'),
                IS_FARMACIA: state.user.roles.includes('farmacia')
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.error
            }
        case 'RESET_ERROR':
            return {
                ...state,
                error: {}
            }
        default:
            return state;
    }
}