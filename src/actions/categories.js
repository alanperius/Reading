import {hideLoading, showLoading} from "react-redux-loading";
import axios from "axios";

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

let token = localStorage.token;
const headers = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
};

function receiveCategories(categories) {
    return{
        type: RECEIVE_CATEGORIES,
        categories,
    }
}


export const handleAllCategories = () => {
    return dispatch => {
        dispatch(showLoading())
        return axios
            .get("http://localhost:3001/categories", { headers: headers })
            .then(response => {
                console.log("response.data")
                console.log(response.data)
                dispatch(receiveCategories(response.data.categories));
                dispatch(hideLoading())
            })
            .catch(error => {
                console.log(error);
            });
    };
};