import {DISLIKE_POST, LIKE_POST, RECEIVE_POSTS, RECEIVE_POSTS_CATEGORY} from "../actions/post";


export default function posts(state = [], action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return [
                ...action.posts
            ]

        case RECEIVE_POSTS_CATEGORY:
            return [
                ...action.posts
            ]
        case LIKE_POST:
            return state.map(post => post.id === action.post.id ? action.post : post)
        case DISLIKE_POST:
            return state.map(post => post.id === action.post.id ? action.post : post)
        default:
            return state
    }
}
