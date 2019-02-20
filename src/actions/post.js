import {hideLoading, showLoading} from "react-redux-loading";
import {increasePost} from "../utils/api";

export const POST_COMMENTS = 'POST_COMMENTS'
export const RECEIVE_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_POSTS_CATEGORY = 'RECEIVE_POSTS_CATEGORY'
export const POST_DETAILS = 'POST_DETAILS'
export const LIKE_POST = 'LIKE_POST'


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

export function handleLikePost(postId) {
    return (dispatch) => {
        dispatch(showLoading())
        return increasePost(postId).then((post) => dispatch(likePost(post)))
            .catch((e) => {
                console.warn('Error in Like Post : ', e)
                alert('Error Like Post')
            })
    }
}

/*
export function handleIncreasePostVotes (postId) {
    return (dispatch) => {
        dispatch(increasePostVotes(postId))

        return increasePostVotesAPI(postId)
            .catch(error =>  {
                dispatch(decreasePostVotes(postId))
                console.warn(error)
            })
    }
}*/
