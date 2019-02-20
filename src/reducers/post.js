import {LIKE_POST, RECEIVE_POSTS, RECEIVE_POSTS_CATEGORY} from "../actions/post";




let updatedPosts = [];
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
            updatedPosts = state.map((item) => {
                if (item.id !== action.post.id)
                    return item

                return {
                    ...item,
                    ...action.post
                }
            })

            return {
                ...state,
                posts: [...updatedPosts]
            }
        default:
            return state
    }
}
