export const LOADPOSTS_PENDING = 'LOADPOSTS_PENDING';
export const LOADPOSTS_SUCCESS = 'LOADPOSTS_SUCCESS';
export const LOADPOSTS_ERROR = 'LOADPOSTS_ERROR';

export const CREATEPOST_PENDING = 'CREATEPOST_PENDING';
export const CREATEPOST_SUCCESS = 'CREATEPOST_SUCCESS';
export const CREATEPOST_ERROR = 'CREATEPOST_ERROR';

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
        .then(handleLoadPostsResponse)
        .then(postList => {
            return postList;
        });
}

function handleLoadPostsResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
            return data.reverse();
        }
    });
}

export function getCreatePostPendingAction() {
    return {
        type: CREATEPOST_PENDING
    }
}

export function getCreatePostSuccessAction() {
    return {
        type: CREATEPOST_SUCCESS
    }
}

export function getCreatePostErrorAction(error) {
    return {
        type: CREATEPOST_ERROR,
        error: error
    }
}

export function createPostAction(titel, content, token) {
    console.log("Create post");

    return dispatch => {
        dispatch(getCreatePostPendingAction());
        createPost(titel, content, token)
            .then(
                () => {
                    dispatch(getCreatePostSuccessAction());
                    dispatch(getPostList());
                },
                error => {
                    dispatch(getCreatePostErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getCreatePostErrorAction(error));
            });
    }
}

function createPost(titel, content, token) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ forumPost: { titel, content } })
    };

    return fetch('https://localhost:8080/forum/', requestOptions)
        .then(handleCreatePostResponse)
}

function handleCreatePostResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    });
}