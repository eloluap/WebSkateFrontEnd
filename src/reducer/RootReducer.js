import * as authentionActions from '../actions/AuthenticationActions';

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    error: null
};

function rootReducer(state = initialState, action) {
    console.log("RootReducer: " + action.type);

    switch (action.type) {
        case authentionActions.SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            };
        case authentionActions.HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: null
            };
        case authentionActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                loginPending: true,
                error: null
            };
        case authentionActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                loginPending: false,
                user: action.user,
                accessToken: action.accessToken
            };
        case authentionActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                loginPending: false,
                error: 'Authentication failed'
            };
        default:
            return state;
    }
};

export default rootReducer;