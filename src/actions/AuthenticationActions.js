export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const SHOW_REGISTRATION_DIALOG = 'SHOW_REGISTRATION_DIALOG';
export const HIDE_REGISTRATION_DIALOG = 'HIDE_REGISTRATION_DIALOG';
export const HIDE_EMAILSENT_DIALOG = 'HIDE_EMAILSENT_DIALOG';

export const REGISTRATION_PENDING = 'REGISTRATION_PENDING';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

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
        .then(handleLoginResponse)
        .then(userSession => {
            return userSession;
        });
}

function handleLoginResponse(response) {
    const authorizationHeader = response.headers.get('Authorization');

    return response.text().then(text => {
        console.log('Receive result: ' + authorizationHeader);

        const data = text && JSON.parse(text);
        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(" ")[1];
        }

        if (!response.ok) {
            const error = "Falscher Nutzername oder Passwort.";
            return Promise.reject(error);
        } else {
            const validated = data.validated;
            if (!validated) {
                const error = "Account wurde noch nicht bestätigt.";
                return Promise.reject(error);
            }
            let userSession = {
                user: data,
                accessToken: token
            }
            console.log(userSession);
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

export function getShowRegistrationDialogAction() {
    return {
        type: SHOW_REGISTRATION_DIALOG
    }
}

export function getHideRegistrationDialogAction() {
    return {
        type: HIDE_REGISTRATION_DIALOG
    }
}

export function getHideEmailSentDialogAction() {
    return {
        type: HIDE_EMAILSENT_DIALOG
    }
}

export function getRegistrationPendingAction() {
    return {
        type: REGISTRATION_PENDING
    }
}

export function getRegistrationSuccessAction() {
    return {
        type: REGISTRATION_SUCCESS
    }
}

export function getRegistrationErrorAction(error) {
    return {
        type: REGISTRATION_ERROR,
        error: error
    }
}

export function registrateUser(email, userID, password) {
    console.log("Registrate");

    return dispatch => {
        dispatch(getRegistrationPendingAction());
        registrate(email, userID, password)
            .then(
                () => {
                    dispatch(getRegistrationSuccessAction());
                },
                error => {
                    dispatch(getRegistrationErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getRegistrationErrorAction(error));
            });
    }
}

function registrate(email, userID, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ user: { email, userID, password } })
    };

    return fetch('https://localhost:8080/registration/', requestOptions)
        .then(handleRegistrationResponse);
}

function handleRegistrationResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    });
}