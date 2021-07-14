export const LOADPOSTS_PENDING = 'LOADPOSTS_PENDING';
export const LOADPOSTS_SUCCESS = 'LOADPOSTS_SUCCESS';
export const LOADPOSTS_ERROR = 'LOADPOSTS_ERROR';

export const CREATEPOST_PENDING = 'CREATEPOST_PENDING';
export const CREATEPOST_SUCCESS = 'CREATEPOST_SUCCESS';
export const CREATEPOST_ERROR = 'CREATEPOST_ERROR';

export const LOADPOST_PENDING = 'LOADPOST_PENDING';
export const LOADPOST_SUCCESS = 'LOADPOST_SUCCESS';
export const LOADPOST_ERROR = 'LOADPOST_ERROR';

export const LOADCOMMENTS_PENDING = 'LOADCOMMENTS_PENDING';
export const LOADCOMMENTS_SUCCESS = 'LOADCOMMENTS_SUCCESS';
export const LOADCOMMENTS_ERROR = 'LOADCOMMENTS_ERROR';

export const CREATECOMMENT_PENDING = 'CREATECOMMENT_PENDING';
export const CREATECOMMENT_SUCCESS = 'CREATECOMMENT_SUCCESS';
export const CREATECOMMENT_ERROR = 'CREATECOMMENT_ERROR';

export const CLEAR_ACTIVE_POST = 'CLEAR_ACTIVE_POST';

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

export function getLoadPostPendingAction() {
    return {
        type: LOADPOST_PENDING
    }
}

export function getLoadPostSuccessAction(post) {
    return {
        type: LOADPOST_SUCCESS,
        post: post
    }
}

export function getLoadPostErrorAction(error) {
    return {
        type: LOADPOST_ERROR,
        error: error
    }
}

export function getPost(postID) {
    console.log("Get Post");

    return dispatch => {
        dispatch(getLoadPostPendingAction());
        loadPost(postID)
            .then(
                post => {
                    dispatch(getLoadPostSuccessAction(post));
                },
                error => {
                    dispatch(getLoadPostErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getLoadPostErrorAction(error));
            });
    }
}

function loadPost(postID) {
    const url = 'https://localhost:8080/forum/' + postID;
    const requestOptions = {
        method: 'GET'
    };

    return fetch(url, requestOptions)
        .then(handleLoadPostResponse)
        .then(post => {
            return post;
        });
}

function handleLoadPostResponse(response) {
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

export function getLoadCommentsPendingAction() {
    return {
        type: LOADCOMMENTS_PENDING
    }
}

export function getLoadCommentsSuccessAction(commentList) {
    return {
        type: LOADCOMMENTS_SUCCESS,
        comments: commentList
    }
}

export function getLoadCommentsErrorAction(error) {
    return {
        type: LOADCOMMENTS_ERROR,
        error: error
    }
}

export function getCommentList(postID) {
    console.log("Get Comment List");

    return dispatch => {
        dispatch(getLoadCommentsPendingAction());
        loadComments(postID)
            .then(
                commentList => {
                    dispatch(getLoadCommentsSuccessAction(commentList));
                },
                error => {
                    dispatch(getLoadCommentsErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getLoadCommentsErrorAction(error));
            });
    }
}

function loadComments(postID) {
    const url = 'https://localhost:8080/comment/forum/' + postID;
    const requestOptions = {
        method: 'GET'
    };

    return fetch(url, requestOptions)
        .then(handleLoadCommentsResponse)
        .then(commentList => {
            return commentList;
        });
}

function handleLoadCommentsResponse(response) {
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

export function getCreateCommentPendingAction() {
    return {
        type: CREATECOMMENT_PENDING
    }
}

export function getCreateCommentSuccessAction() {
    return {
        type: CREATECOMMENT_SUCCESS
    }
}

export function getCreateCommentErrorAction(error) {
    return {
        type: CREATECOMMENT_ERROR,
        error: error
    }
}

export function createCommentAction(postID, content, token) {
    console.log("Create comment");

    return dispatch => {
        dispatch(getCreateCommentPendingAction());
        createComment(postID, content, token)
            .then(
                () => {
                    dispatch(getCreateCommentSuccessAction());
                    dispatch(getCommentList(postID));
                },
                error => {
                    dispatch(getCreateCommentErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getCreateCommentErrorAction(error));
            });
    }
}

function createComment(postID, content, token) {
    const url = 'https://localhost:8080/comment/forum/' + postID;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ comment: { postID: postID, content: content } })
    };

    return fetch(url, requestOptions)
        .then(handleCreateCommentResponse)
}

function handleCreateCommentResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    });
}

export function clearActivePost() {
    return {
        type: CLEAR_ACTIVE_POST
    }
}