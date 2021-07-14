import * as authenticationActions from '../actions/AuthenticationActions';
import * as postActions from '../actions/PostActions';

const initialState = {
    user: null,
    accessToken: null,
    loginPending: false,
    registrationPending: false,
    showLoginDialog: false,
    showRegistrationDialog: false,
    showEmailSentDialog: false,
    error: null,
    loadPostsPending: false,
    createPostPending: false,
    loadPostPending: false,
    loadCommentsPending: false,
    createCommentPending: false
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
        case postActions.LOADPOSTS_PENDING:
            return {
                ...state,
                loadPostsPending: true,
                error: null
            };
        case postActions.LOADPOSTS_SUCCESS:
            return {
                ...state,
                loadPostsPending: false,
                posts: action.posts
            };
        case postActions.LOADPOSTS_ERROR:
            return {
                ...state,
                loadPostsPending: false,
                error: action.error
            };
        case postActions.CREATEPOST_PENDING:
            return {
                ...state,
                createPostPending: true,
                error: null
            };
        case postActions.CREATEPOST_SUCCESS:
            return {
                ...state,
                createPostPending: false
            };
        case postActions.CREATEPOST_ERROR:
            return {
                ...state,
                createPostPending: false,
                error: action.error
            };
        case postActions.LOADPOST_PENDING:
            return {
                ...state,
                loadPostPending: true,
                error: null
            };
        case postActions.LOADPOST_SUCCESS:
            return {
                ...state,
                loadPostPending: false,
                activePost: action.post
            };
        case postActions.LOADPOST_ERROR:
            return {
                ...state,
                loadPostPending: false,
                error: action.error
            };
        case postActions.LOADCOMMENTS_PENDING:
            return {
                ...state,
                loadCommentsPending: true,
                error: null
            };
        case postActions.LOADCOMMENTS_SUCCESS:
            return {
                ...state,
                loadCommentsPending: false,
                comments: action.comments
            };
        case postActions.LOADCOMMENTS_ERROR:
            return {
                ...state,
                loadCommentsPending: false,
                error: action.error
            };
        case postActions.CREATECOMMENT_PENDING:
            return {
                ...state,
                createCommentPending: true,
                error: null
            };
        case postActions.CREATECOMMENT_SUCCESS:
            return {
                ...state,
                createCommentPending: false
            };
        case postActions.CREATECOMMENT_ERROR:
            return {
                ...state,
                createCommentPending: false,
                error: action.error
            };
        case postActions.CLEAR_ACTIVE_POST:
            return {
                ...state,
                loadCommentsPending: false,
                error: null,
                activePost: null,
                comments: []
            };
        default:
            return state;
    }
};

export default rootReducer;