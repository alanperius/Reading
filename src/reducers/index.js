import {combineReducers} from "redux";
import posts from './post'
import categories from './categories'
import comments from './comments'
import {loadingBarReducer} from "react-redux-loading";

export default combineReducers({
    posts,
    categories,
    comments,
    loadingBar: loadingBarReducer
})
