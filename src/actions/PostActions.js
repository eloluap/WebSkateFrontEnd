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

export const SENDAIINPUT_PENDING = 'SENDAIINPUT_PENDING';
export const SENDAIINPUT_SUCCESS = 'SENDAIINPUT_SUCCESS';
export const SENDAIINPUT_ERROR = 'SENDAIINPUT_ERROR';

export const SHOW_EDITPOST_DIALOG = 'SHOW_EDITPOST_DIALOG';
export const HIDE_EDITPOST_DIALOG = 'HIDE_EDITPOST_DIALOG';
export const EDITPOST_PENDING = 'EDITPOST_PENDING';
export const EDITPOST_SUCCESS = 'EDITPOST_SUCCESS';
export const EDITPOST_ERROR = 'EDITPOST_ERROR';

export const SHOW_DELETEPOST_DIALOG = 'SHOW_DELETEPOST_DIALOG';
export const HIDE_DELETEPOST_DIALOG = 'HIDE_DELETEPOST_DIALOG';
export const DELETEPOST_PENDING = 'DELETEPOST_PENDING';
export const DELETEPOST_SUCCESS = 'DELETEPOST_SUCCESS';
export const DELETEPOST_ERROR = 'DELETEPOST_ERROR';

export const SHOW_DELETECOMMENT_DIALOG = 'SHOW_DELETECOMMENT_DIALOG';
export const HIDE_DELETECOMMENT_DIALOG = 'HIDE_DELETECOMMENT_DIALOG';
export const DELETECOMMENT_PENDING = 'DELETECOMMENT_PENDING';
export const DELETECOMMENT_SUCCESS = 'DELETECOMMENT_SUCCESS';
export const DELETECOMMENT_ERROR = 'DELETECOMMENT_ERROR';

export const SHOW_EDITCOMMENT_DIALOG = 'SHOW_EDITCOMMENT_DIALOG';
export const HIDE_EDITCOMMENT_DIALOG = 'HIDE_EDITCOMMENT_DIALOG';
export const EDITCOMMENT_PENDING = 'EDITCOMMENT_PENDING';
export const EDITCOMMENT_SUCCESS = 'EDITCOMMENT_SUCCESS';
export const EDITCOMMENT_ERROR = 'EDITCOMMENT_ERROR';

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

export function getShowEditPostDialogAction() {
    return {
        type: SHOW_EDITPOST_DIALOG
    }
}

export function getHideEditPostDialogAction() {
    return {
        type: HIDE_EDITPOST_DIALOG
    }
}

export function getEditPostPendingAction() {
    return {
        type: EDITPOST_PENDING
    }
}

export function getEditPostSuccessAction() {
    return {
        type: EDITPOST_SUCCESS
    }
}

export function getEditPostErrorAction(error) {
    return {
        type: EDITPOST_ERROR,
        error: error
    }
}

export function editPostSelf(postID, titel, content, token) {
    return dispatch => {
        dispatch(getEditPostPendingAction());
        editPost(postID, titel, content, token)
            .then(
                () => {
                    dispatch(getPost(postID));
                    dispatch(getHideEditPostDialogAction());
                    dispatch(getEditPostSuccessAction());
                },
                error => {
                    dispatch(getEditPostErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getEditPostErrorAction(error));
            });
    }
}

function editPost(postID, titel, content, token) {
    const url = 'https://localhost:8080/forum/' + postID;
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            forumPost: {
                titel: titel,
                content: content
            }
        })
    };

    return fetch(url, requestOptions)
        .then(handleEditPostResponse)
}

function handleEditPostResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    });
}

export function getShowDeletePostDialogAction() {
    return {
        type: SHOW_DELETEPOST_DIALOG
    }
}

export function getHideDeletePostDialogAction() {
    return {
        type: HIDE_DELETEPOST_DIALOG
    }
}

export function getDeletePostPendingAction() {
    return {
        type: DELETEPOST_PENDING
    }
}

export function getDeletePostSuccessAction() {
    return {
        type: DELETEPOST_SUCCESS
    }
}

export function getDeletePostErrorAction(error) {
    return {
        type: DELETEPOST_ERROR,
        error: error
    }
}

export function deletePost(postID, token) {
    return dispatch => {
        dispatch(getDeletePostPendingAction());
        deletePostStep(postID, token)
            .then(
                () => {
                    dispatch(getHideDeletePostDialogAction());
                    dispatch(getDeletePostSuccessAction());
                },
                error => {
                    dispatch(getDeletePostErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getDeletePostErrorAction(error));
            });
    }
}

function deletePostStep(postID, token) {
    const url = 'https://localhost:8080/forum/' + postID;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + token
        }
    };

    return fetch(url, requestOptions)
        .then(handleDeletePostResponse)
}

function handleDeletePostResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    });
}

export function getShowDeleteCommentDialogAction(commentID) {
    return {
        type: SHOW_DELETECOMMENT_DIALOG,
        commentID: commentID
    }
}

export function getHideDeleteCommentDialogAction() {
    return {
        type: HIDE_DELETECOMMENT_DIALOG
    }
}

export function getDeleteCommentPendingAction() {
    return {
        type: DELETECOMMENT_PENDING
    }
}

export function getDeleteCommentSuccessAction() {
    return {
        type: DELETECOMMENT_SUCCESS
    }
}

export function getDeleteCommentErrorAction(error) {
    return {
        type: DELETECOMMENT_ERROR,
        error: error
    }
}

export function deleteComment(postID, commentID, token) {
    return dispatch => {
        dispatch(getDeleteCommentPendingAction());
        deleteCommentStep(commentID, token)
            .then(
                () => {
                    dispatch(getHideDeleteCommentDialogAction());
                    dispatch(getDeleteCommentSuccessAction());
                    dispatch(getCommentList(postID));
                },
                error => {
                    dispatch(getDeleteCommentErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getDeleteCommentErrorAction(error));
            });
    }
}

function deleteCommentStep(commentID, token) {
    const url = 'https://localhost:8080/comment/' + commentID;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + token
        }
    };

    return fetch(url, requestOptions)
        .then(handleDeleteCommentResponse)
}

function handleDeleteCommentResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    });
}

export function getShowEditCommentDialogAction(commentID) {
    return {
        type: SHOW_EDITCOMMENT_DIALOG,
        commentID: commentID
    }
}

export function getHideEditCommentDialogAction() {
    return {
        type: HIDE_EDITCOMMENT_DIALOG
    }
}

export function getEditCommentPendingAction() {
    return {
        type: EDITCOMMENT_PENDING
    }
}

export function getEditCommentSuccessAction() {
    return {
        type: EDITCOMMENT_SUCCESS
    }
}

export function getEditCommentErrorAction(error) {
    return {
        type: EDITCOMMENT_ERROR,
        error: error
    }
}

export function editCommentSelf(postID, commentID, content, token) {
    return dispatch => {
        dispatch(getEditCommentPendingAction());
        editComment(commentID, content, token)
            .then(
                () => {
                    dispatch(getHideEditCommentDialogAction());
                    dispatch(getEditCommentSuccessAction());
                    dispatch(getCommentList(postID));
                },
                error => {
                    dispatch(getEditCommentErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getEditCommentErrorAction(error));
            });
    }
}

function editComment(commentID, content, token) {
    const url = 'https://localhost:8080/comment/' + commentID;
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            comment: {
                content: content
            }
        })
    };

    return fetch(url, requestOptions)
        .then(handleEditCommentResponse)
}

function handleEditCommentResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    });
}

export function getSendAiInputPendingAction() {
    return {
        type: SENDAIINPUT_PENDING
    }
}

export function getSendAiInputSuccessAction() {
    return {
        type: SENDAIINPUT_SUCCESS
    }
}

export function getSendAiInputErrorAction(error) {
    return {
        type: SENDAIINPUT_ERROR,
        error: error
    }
}

export function sendAIInputAction(postID, content, token, history) {
    console.log("Send Input to AI");

    return dispatch => {
        dispatch(getSendAiInputPendingAction());
        sendAIInput(postID, content, token)
            .then(
                response => {
                    dispatch(getSendAiInputSuccessAction());
                    // Depending on the call specified in the response decide which api call to do
                    switch (response.call) {
                        case "GET_post":
                            // Change the site to response.body.postID
                            history.push("/Forum/" + response.body.postID);
                            break;
                        case "POST_post":
                            // Dispatch Create Post
                            dispatch(createPostAction(response.body.title, response.body.text, token));
                            break;
                        case "PUT_post":
                            // Dispatch Update Post
                            dispatch(editPostSelf(postID, response.body.title, response.body.text, token));
                            break;
                        case "DELETE_post":
                            // Dispatch Delete Post
                            dispatch(deletePost(postID, token));
                            break;
                        case "POST_comment":
                            // Dispatch Create Comment
                            dispatch(createCommentAction(postID, response.body.text, token));
                            break;
                        case "PUT_comment":
                            // Dispatch Update Comment
                            dispatch(editCommentSelf(postID, response.body.commentID, response.body.text, token));
                            break;
                        case "DELETE_comment":
                            // Dispatch Delete Comment
                            dispatch(deleteComment(postID, response.body.commentID, token));
                            break;
                        default:
                            console.log("The requested call in the response doesn't exist")
                            break;
                    }
                },
                error => {
                    dispatch(getSendAiInputErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getSendAiInputErrorAction(error));
            });
    }
}

// Maybe Later go the route with dispatch for Pending Actions etc
function sendAIInput(postID, content, token) {
    // PostId is -1 if no Post is open
    const url = 'https://localhost:8080/ai/';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            userInput: {
                content: content,
                postID: postID
            }
        })
    };

    return fetch(url, requestOptions)
        .then(handleSendAiInputResponse)
        .then(response => {
            return response;
        });

}

function handleSendAiInputResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log("The AI Response: " + JSON.stringify(data));
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
            return data;
        }
    });
}