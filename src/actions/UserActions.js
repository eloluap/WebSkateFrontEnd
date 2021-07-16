export const SHOW_EDITPROFILE_DIALOG = 'SHOW_EDITPROFILE_DIALOG';
export const HIDE_EDITPROFILE_DIALOG = 'HIDE_EDITPROFILE_DIALOG';
export const EDITPROFILE_PENDING = 'EDITPROFILE_PENDING';
export const EDITPROFILE_SUCCESS = 'EDITPROFILE_SUCCESS';
export const EDITPROFILE_ERROR = 'EDITPROFILE_ERROR';

export const SHOW_DELETEPROFILE_DIALOG = 'SHOW_DELETEPROFILE_DIALOG';
export const HIDE_DELETEPROFILE_DIALOG = 'HIDE_DELETEPROFILE_DIALOG';
export const DELETEPROFILE_PENDING = 'DELETEPROFILE_PENDING';
export const DELETEPROFILE_SUCCESS = 'DELETEPROFILE_SUCCESS';
export const DELETEPROFILE_ERROR = 'DELETEPROFILE_ERROR';

export function getShowEditProfileDialogAction() {
    return {
        type: SHOW_EDITPROFILE_DIALOG
    }
}

export function getHideEditProfileDialogAction() {
    return {
        type: HIDE_EDITPROFILE_DIALOG
    }
}

export function getEditProfilePendingAction() {
    return {
        type: EDITPROFILE_PENDING
    }
}

export function getEditProfileSuccessAction(user) {
    return {
        type: EDITPROFILE_SUCCESS,
        user: user
    }
}

export function getEditProfileErrorAction(error) {
    return {
        type: EDITPROFILE_ERROR,
        error: error
    }
}

export function updateUser(userID, email, username, password, token) {
    return dispatch => {
        dispatch(getEditProfilePendingAction());
        updateUserStep(userID, email, username, password, token)
            .then(
                (user) => {
                    dispatch(getHideEditProfileDialogAction());
                    dispatch(getEditProfileSuccessAction(user));
                },
                error => {
                    dispatch(getEditProfileErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getEditProfileErrorAction(error));
            });
    }
}

function updateUserStep(userID, email, username, password, token) {
    const url = 'https://localhost:8080/users/' + userID;
    var userContent = {};
    console.log("step, new pass: " + password);
    if (email !== null) {
        userContent = {
            ...userContent,
            email: email
        }
    }
    if (username !== null) {
        userContent = {
            ...userContent,
            userName: username
        }
    }
    if (password !== null) {
        userContent = {
            ...userContent,
            password: password
        }
    }
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            user: {
                ...userContent
            }
        })
    };

    return fetch(url, requestOptions)
        .then(handleEditProfileResponse)
        .then(user => {
            return user;
        });
}

function handleEditProfileResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
            return data;
        }
    });
}

export function getShowDeleteProfileDialogAction() {
    return {
        type: SHOW_DELETEPROFILE_DIALOG
    }
}

export function getHideDeleteProfileDialogAction() {
    return {
        type: HIDE_DELETEPROFILE_DIALOG
    }
}

export function getDeleteProfilePendingAction() {
    return {
        type: DELETEPROFILE_PENDING
    }
}

export function getDeleteProfileSuccessAction() {
    return {
        type: DELETEPROFILE_SUCCESS
    }
}

export function getDeleteProfileErrorAction(error) {
    return {
        type: DELETEPROFILE_ERROR,
        error: error
    }
}

export function deleteProfile(userID, token) {
    return dispatch => {
        dispatch(getDeleteProfilePendingAction());
        deleteProfileStep(userID, token)
            .then(
                () => {
                    dispatch(getHideDeleteProfileDialogAction());
                    dispatch(getDeleteProfileSuccessAction());
                },
                error => {
                    dispatch(getDeleteProfileErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getDeleteProfileErrorAction(error));
            });
    }
}

function deleteProfileStep(userID, token) {
    const url = 'https://localhost:8080/users/' + userID;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + token
        }
    };

    return fetch(url, requestOptions)
        .then(handleDeleteProfileResponse)
}

function handleDeleteProfileResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    });
}