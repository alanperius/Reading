import axios from 'axios';
import {hideLoading, showLoading} from "react-redux-loading";

export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DISLIKE_COMMENT = 'DISLIKE_COMMENT';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

let token = localStorage.token;
const headers = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
};

export const handlePostCommentsById = id => {
    return dispatch => {
        dispatch(showLoading());
        return axios
            .get(
                `http://localhost:3001/posts/${id}/comments`,
                {headers: headers}
            )
            .then(response => {
                dispatch(receivePostComments(response.data));
                dispatch(hideLoading())

            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const handleAddComment = (comment) => {
    return dispatch => {
        dispatch(showLoading());
        axios({
            method: 'post',
            headers: headers,
            url: 'http://localhost:3001/comments',
            data: {
                id: Math.random().toString(36).substr(-8),
                timestamp: Date.now(),
                body: comment.body,
                author: comment.author,
                parentId: comment.parentId
            }
        })
            .then(res => {
                console.log(res.data);
                dispatch(addComment(res.data));
                dispatch(hideLoading())
            })
            .catch(err => {
                console.log(err)
            });
    }
};

export const handleLikeComment = id => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .post(
                `http://localhost:3001/comments/${id}`,
                { option: "upVote" },
                { headers: headers }
            )
            .then(response => {
                dispatch(likeComment(response.data));
                dispatch(hideLoading())
                /* console.log("Sucesso");
                 console.log(response.data);*/
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const handleDislikeComment = id => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .post(
                `http://localhost:3001/comments/${id}`,
                { option: "downVote" },
                { headers: headers }
            )
            .then(response => {
                dispatch(dislikeComment(response.data));
                dispatch(hideLoading())
                /* console.log("handleDislikePost");
                 console.log(response.data);*/
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const handleDeleteComment = (id) => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .delete(
                `http://localhost:3001/comments/${id}`,
                { headers: headers }
            )
            .then(response => {
                dispatch(deleteComment(response.data));
                dispatch(hideLoading())
            })
            .catch(error => {
                console.log(error);
            });
    };
};


export const handleEditComment = (id, body) => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .put(
                `http://localhost:3001/comments/${id}`,
                {timestamp: Date.now(), body: body},
                { headers: headers }
            )
            .then(response => {
                console.log("--------------------");
                console.log(response.data);
                dispatch(editComment(response.data));
                dispatch(hideLoading())
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export function editComment(comment) {
    return {
        type: EDIT_COMMENT,
        comment,
    }
}

export function deleteComment(commentDeleted) {
    return {
        type: DELETE_COMMENT,
        commentDeleted,
    }
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment,
    }
}

export function receivePostComments(comments) {
    return {
        type: RECEIVE_POST_COMMENTS,
        comments,
    }
}

function likeComment(comment) {
    return {
        type: LIKE_COMMENT,
        comment,
    }
}

function dislikeComment(comment) {
    return {
        type: DISLIKE_COMMENT,
        comment,
    }
}
