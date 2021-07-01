export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const LOGOUT_USER = 'LOGOUT_USER';

export function getShowLoginDialogAction() {
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction() {
    return {
        type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticationPendingAction() {
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession) {
    return {
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function getAuthenticationErrorAction(error) {
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function authenticateUser(userID, password) {
    console.log("Authenticate");

    return dispatch => {
        dispatch(getAuthenticationPendingAction());
        login(userID, password)
            .then(
                userSession => {
                    dispatch(getAuthenticationSuccessAction(userSession));
                },
                error => {
                    dispatch(getAuthenticationErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error));
            });
    }
}

function login(userID, password) {
    var base64Cred = btoa(userID + ":" + password);
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': "Basic " + base64Cred }
    };

    return fetch('https://localhost:8080/authenticate/loginBasic', requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession;
        });
}

function handleResponse(response) {
    const authorizationHeader = response.headers.get('Authorization');

    return response.text().then(text => {
        console.log('Receive result: ' + authorizationHeader);

        const data = text && JSON.parse(text);
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(" ")[1];
        }

        if (!response.ok) {
            if (response.status === 401) {
                return getLogoutAction();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
            let userSession = {
                user: data,
                accessToken: token
            }
            return userSession;
        }
    });
}

export function getLogoutAction() {
    console.log("Should logout user");

    return {
        type: LOGOUT_USER
    }
}