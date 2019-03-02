import axios from 'axios';

import {hideLoading, showLoading} from "react-redux-loading";
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_POSTS_CATEGORY = 'RECEIVE_POSTS_CATEGORY'
export const LIKE_POST = 'LIKE_POST'
export const DISLIKE_POST = 'DISLIKE_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_QTY_COMMENTS = 'GET_QTY_COMMENTS'


let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
}

export const handleAddPost = (post) => {
    return dispatch => {
        dispatch(showLoading())
        axios({
            method: 'post',
            headers: headers,
            url: 'http://localhost:3001/posts',
            data: {
                id: Math.random().toString(36).substr(-8),
                timestamp: Date.now(),
                title: post.title,
                body: post.body,
                author: post.author,
                category: post.category
            }
        })
            .then(res => {
                dispatch(addPost(res.data))
                dispatch(hideLoading())
            })
            .catch(err => {
                console.log(err)
            });
    }
}

export const handleAllPosts = () => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .get("http://localhost:3001/posts", { headers: headers })
            .then(response => {
                dispatch(receivePosts(response.data));
                dispatch(hideLoading())
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const handlePostsForCategories = (category) => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .get(`http://localhost:3001/${category}/posts`, { headers: headers })
            .then(response => {
                dispatch(receivePostsByCategory(response.data));
                dispatch(hideLoading())
            })
            .catch(error => {
                console.log(error);
            });
    };
};


export const handleLikePost = id => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .post(
                `http://localhost:3001/posts/${id}`,
                { option: "upVote" },
                { headers: headers }
            )
            .then(response => {
                dispatch(likePost(response.data));
                dispatch(hideLoading())
                /* console.log("Sucesso");
                 console.log(response.data);*/
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const handlePostById = id => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .get(
                `http://localhost:3001/posts/${id}`,
                { headers: headers }
            )
            .then(response => {
                if(JSON.stringify(response.data) !== '{}'){
                    dispatch(receivePost(response.data));
                }
                dispatch(hideLoading())
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const handleDislikePost = id => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .post(
                `http://localhost:3001/posts/${id}`,
                { option: "downVote" },
                { headers: headers }
            )
            .then(response => {
                dispatch(dislikePost(response.data));
                dispatch(hideLoading())
                /* console.log("handleDislikePost");
                 console.log(response.data);*/
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const handleDeletePost = (id) => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .delete(
                `http://localhost:3001/posts/${id}`,
                { headers: headers }
            )
            .then(response => {
                dispatch(deletePost(response.data));
                dispatch(hideLoading())
                /* console.log("handleDislikePost");
                 console.log(response.data);*/
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const handleEditPost = (id, title, body) => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .put(
                `http://localhost:3001/posts/${id}`,
                {title: title,body: body},
                { headers: headers }
            )
            .then(response => {
                dispatch(editPost(response.data));
                dispatch(hideLoading())
            })
            .catch(error => {
                console.log(error);
            });
    };
};


export function getQtyComments(newComment){
    return {
        type: GET_QTY_COMMENTS,
        newComment,
    }

}

function editPost(post) {
    return {
        type: EDIT_POST,
        post,
    }
}

function deletePost(postDeleted) {
    return {
        type: DELETE_POST,
        postDeleted,
    }
}

function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts,
    }
}

function receivePost(post) {
    return {
        type: RECEIVE_POST,
        post,
    }
}

function receivePostsByCategory(posts) {
    return {
        type: RECEIVE_POSTS_CATEGORY,
        posts
    }
}

function likePost(post) {
    return {
        type: LIKE_POST,
        post,
    }
}

function dislikePost(post) {
    return {
        type: DISLIKE_POST,
        post,
    }
}

function addPost(post){
    return {
        type: ADD_POST,
        post
    }
}