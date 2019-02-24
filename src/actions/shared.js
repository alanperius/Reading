import {
    getAllCategories,
    getPostsForCategories,
} from "../utils/api";

import {receivePostsByCategory} from './post'
import {receiveCategories} from './categories'
import {showLoading, hideLoading} from 'react-redux-loading'




export function handlePostsForCategories(category) {
    return (dispatch) => {
        return getPostsForCategories(category)
            .then((posts) => {
                dispatch(receivePostsByCategory(posts))
            })
    }
}

export function handleAllCategories() {
    return (dispatch) => {
        dispatch(showLoading())
        return getAllCategories()
            .then((categories) => {
                dispatch(receiveCategories(categories))
                dispatch(hideLoading())
            })
    }
}

