const api = "http://localhost:3001";

let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
};
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

export const increasePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({option: 'upVote'})
    })
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(error =>  console.warn(error))

export const decrementPost = (id) =>
    fetch(`${api}/posts/${id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({option: 'downVote'})
    })
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(error =>  console.warn(error))

export const addPost = (postData) => fetch(`${api}/posts`, {
    headers,
    method: 'POST',
    body: JSON.stringify(postData)
})
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.warn(error))

/*
export const savePost = (newPost) => {
        axios({
            method: 'post',
            headers: headers,
            url: `${api}/posts`,
            data: {
                id: Math.random().toString(36).substr(-8),
                timestamp: Date.now(),
                title: newPost.title,
                body: newPost.body,
                author: newPost.author,
                category: newPost.category
            }
        }).then(res => {
            console.log("===============================savePost===");
            console.log(res.data);
            return res.data
        }).catch(error => {
            console.log(error);
            return error
        });
    }
*/


