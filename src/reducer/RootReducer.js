import * as authenticationActions from '../actions/AuthenticationActions';

const initialState = {
    user: null,
    loginPending: false,
    registrationPending: false,
    showLoginDialog: false,
    showRegistrationDialog: false,
    showEmailSentDialog: false,
    error: null
};

function rootReducer(state = initialState, action) {
    console.log("RootReducer: " + action.type);

    switch (action.type) {
        case authenticationActions.SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            };
        case authenticationActions.HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: null
            };
        case authenticationActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                loginPending: true,
                error: null
            };
        case authenticationActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                loginPending: false,
                user: action.user,
                accessToken: action.accessToken
            };
        case authenticationActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                loginPending: false,
                error: action.error
            };
        case authenticationActions.LOGOUT_USER:
            return {
                ...state,
                user: null,
                accessToken: null
            };
        case authenticationActions.SHOW_REGISTRATION_DIALOG:
            return {
                ...state,
                showRegistrationDialog: true,
                error: null
            };
        case authenticationActions.HIDE_REGISTRATION_DIALOG:
            return {
                ...state,
                showRegistrationDialog: false,
                error: null
            };
        case authenticationActions.HIDE_EMAILSENT_DIALOG:
            return {
                ...state,
                showEmailSentDialog: false,
                error: null
            };
        case authenticationActions.REGISTRATION_PENDING:
            return {
                ...state,
                registrationPending: true,
                error: null
            };
        case authenticationActions.REGISTRATION_SUCCESS:
            return {
                ...state,
                showRegistrationDialog: false,
                registrationPending: false,
                showEmailSentDialog: true
            };
        case authenticationActions.REGISTRATION_ERROR:
            return {
                ...state,
                registrationPending: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default rootReducer;