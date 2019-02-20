import {combineReducers} from "redux";
import posts from './post'
import categories from './categories'


export default combineReducers({
    posts,
    categories
})
