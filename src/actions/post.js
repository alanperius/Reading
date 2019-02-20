import axios from 'axios';
import {hideLoading, showLoading} from "react-redux-loading";
import {increasePost, decrementPost} from "../utils/api";

export const POST_COMMENTS = 'POST_COMMENTS'
export const RECEIVE_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_POSTS_CATEGORY = 'RECEIVE_POSTS_CATEGORY'
export const POST_DETAILS = 'POST_DETAILS'
export const LIKE_POST = 'LIKE_POST'
export const DISLIKE_POST = 'DISLIKE_POST'

let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
};

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts,
    }
}

export function receivePostsByCategory(posts) {
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

export function handleLikePost(postId) {
    return (dispatch) => {
        dispatch(showLoading())
        return increasePost(postId).then((post) => dispatch(likePost(post)))
            .catch((e) => {
                console.warn('Error an Post Like : ', e)
                alert('Error an Post Like.')
            })
    }
}

export function handleDislikePost(postId) {
    return (dispatch) => {
        dispatch(showLoading())
        return decrementPost(postId).then((post) => dispatch(dislikePost(post)))
            .catch((e) => {
                console.warn('Error an Post Dislike : ', e)
                alert('Error an Post Dislike.')
            })
    }
}


/*export const handleLikePost = id => {
    return dispatch => {
        return axios
            .post(
                `http://localhost:3001/posts/${id}`,
                { option: "upVote" },
                { headers: headers }
            )
            .then(response => {
                console.log("Sucesso");
                console.log(response.data);
                dispatch(likePost(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
};*/

