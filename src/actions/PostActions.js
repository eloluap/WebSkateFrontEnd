export const LOADPOSTS_PENDING = 'LOADPOSTS_PENDING';
export const LOADPOSTS_SUCCESS = 'LOADPOSTS_SUCCESS';
export const LOADPOSTS_ERROR = 'LOADPOSTS_ERROR';

export function getLoadPostsPendingAction() {
    return {
        type: LOADPOSTS_PENDING
    }
}

export function getLoadPostsSuccessAction(postList) {
    return {
        type: LOADPOSTS_SUCCESS,
        posts: postList
    }
}

export function getLoadPostsErrorAction(error) {
    return {
        type: LOADPOSTS_ERROR,
        error: error
    }
}

export function getPostList() {
    console.log("Get Post List");

    return dispatch => {
        dispatch(getLoadPostsPendingAction());
        loadPosts()
            .then(
                postList => {
                    dispatch(getLoadPostsSuccessAction(postList));
                },
                error => {
                    dispatch(getLoadPostsErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getLoadPostsErrorAction(error));
            });
    }
}

function loadPosts() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch('https://localhost:8080/forum/', requestOptions)
        .then(handleResponse)
        .then(postList => {
            return postList;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
            console.log(data);
            return data;
        }
    });
}