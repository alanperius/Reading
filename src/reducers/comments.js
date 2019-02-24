import {RECEIVE_POST_COMMENTS, ADD_COMMENT, LIKE_COMMENT, DISLIKE_COMMENT, DELETE_COMMENT} from "../actions/comments";

export default function posts(state = [], action) {
    switch (action.type) {
        case RECEIVE_POST_COMMENTS:
            return [...action.comments]
        case ADD_COMMENT:
            return [action.comment, ...state]
        case LIKE_COMMENT:
            return state.map(comment => comment.id === action.comment.id ? action.comment : comment)
        case DISLIKE_COMMENT:
            return state.map(comment => comment.id === action.comment.id ? action.comment : comment)
        case DELETE_COMMENT:
            return state.filter(comment => comment.id !== action.commentDeleted.id)
        default:
            return state
    }
}
