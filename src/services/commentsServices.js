import axios from 'axios'


const API_URL = import.meta.env.VITE_API_BASE_URL 

export async function createComment(comment) {
    const data = await axios.post(`${API_URL}/comments`,comment,{
        headers:{
            "token": localStorage.getItem("userToken")
        }
    })
    return data

}


export async function updateComment(comment , commentId) {
    const data = await axios.put(`${API_URL}/comments/${commentId}`,comment,{
        headers:{
            "token": localStorage.getItem("userToken")
        }
    })
    return data

}


export async function deleteComment(commentId) {
    const data = await axios.delete(`${API_URL}/comments/${commentId}`,{
        headers:{
            "token": localStorage.getItem("userToken")
        }
    })
    return data

}
export async function getPostComments(postId) {
    const data = await axios.get(`${API_URL}/posts/${postId}/comments`,{
        headers:{
            "token": localStorage.getItem("userToken")
        }
    })
    return data

}
