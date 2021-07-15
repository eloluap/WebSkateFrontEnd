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
    createCommentPending: false,
    editPostPending: false,
    showEditPostDialog: false,
    deletePostPending: false,
    showDeletePostDialog: false,
    redirectDelete: false,
    showDeleteCommentDialog: false,
    deleteCommentPending: false,
    showEditCommentDialog: false,
    editCommentPending: false
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
                redirectDelete: false,
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
                createCommentPending: false,
                comments: []
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
        case postActions.SHOW_EDITPOST_DIALOG:
            return {
                ...state,
                showEditPostDialog: true,
                error: null
            };
        case postActions.HIDE_EDITPOST_DIALOG:
            return {
                ...state,
                showEditPostDialog: false,
                error: null
            };
        case postActions.EDITPOST_PENDING:
            return {
                ...state,
                editPostPending: true,
                error: null
            };
        case postActions.EDITPOST_SUCCESS:
            return {
                ...state,
                editPostPending: false
            };
        case postActions.EDITPOST_ERROR:
            return {
                ...state,
                editPostPending: false,
                error: action.error
            };
        case postActions.SHOW_DELETEPOST_DIALOG:
            return {
                ...state,
                showDeletePostDialog: true,
                error: null
            };
        case postActions.HIDE_DELETEPOST_DIALOG:
            return {
                ...state,
                showDeletePostDialog: false,
                error: null
            };
        case postActions.DELETEPOST_PENDING:
            return {
                ...state,
                deletePostPending: true,
                error: null
            };
        case postActions.DELETEPOST_SUCCESS:
            return {
                ...state,
                deletePostPending: false,
                redirectDelete: true
            };
        case postActions.DELETEPOST_ERROR:
            return {
                ...state,
                deletePostPending: false,
                error: action.error
            };
        case postActions.SHOW_DELETECOMMENT_DIALOG:
            return {
                ...state,
                showDeleteCommentDialog: true,
                clickedComment: action.commentID,
                error: null
            };
        case postActions.HIDE_DELETECOMMENT_DIALOG:
            return {
                ...state,
                showDeleteCommentDialog: false,
                error: null
            };
        case postActions.DELETECOMMENT_PENDING:
            return {
                ...state,
                deleteCommentPending: true,
                error: null
            };
        case postActions.DELETECOMMENT_SUCCESS:
            return {
                ...state,
                clickedComment: null,
                deleteCommentPending: false,
                comments: []
            };
        case postActions.DELETECOMMENT_ERROR:
            return {
                ...state,
                deleteCommentPending: false,
                error: action.error
            };
        case postActions.SHOW_EDITCOMMENT_DIALOG:
            return {
                ...state,
                clickedComment: action.commentID,
                showEditCommentDialog: true,
                error: null
            };
        case postActions.HIDE_EDITCOMMENT_DIALOG:
            return {
                ...state,
                showEditCommentDialog: false,
                error: null
            };
        case postActions.EDITCOMMENT_PENDING:
            return {
                ...state,
                editCommentPending: true,
                error: null
            };
        case postActions.EDITCOMMENT_SUCCESS:
            return {
                ...state,
                clickedComment: null,
                editCommentPending: false
            };
        case postActions.EDITCOMMENT_ERROR:
            return {
                ...state,
                editCommentPending: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default rootReducer;