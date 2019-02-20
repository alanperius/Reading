import axios from 'axios';

const api = "http://localhost:3001";

const headers = {
    'Accept': 'application/json',
    'Authorization': 'whatever-you-want'
}

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => {

            return data
        })
        .catch(error => {
            return error
        })

export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const getPostsForCategories = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())
        .then(data => {
            return data
        })

export const getPostDetails = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'get',
        headers
    })
        .then(res => res.json())
        .then(data => {
            console.log("post com detalhes", postId)
            console.log(data)
            return data
        })
        .catch(error => {
            console.log(error)
            return error
        })

export const getPostComments = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, {
        method: 'get',
        headers
    })
        .then(res => res.json())
        .then(data => {
           /* console.log("post com commentários", postId)
            console.log(data)*/
            return data
        })
        .catch(error => {
            console.log(error)
            return error
        })



/*export const votePostUpdate = (id, voteOption) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            option: voteOption
        }),
        headers
    })
        .then(res => res.json())
        .then(data => {
             console.log("post com commentários")
             console.log(data)
            return data
        })
        .catch(error => {
            console.log(error)
            return error
        })*/

export const increasePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ option: 'upVote' })
    })
        .then(res => res.json())
        .then(data => {
           return data
        })
        .catch(error =>  console.warn(error))

export default api;


