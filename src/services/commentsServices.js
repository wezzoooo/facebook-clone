import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL

export async function getPostComments(postId) {
    const data = await axios.get(`${API_URL}/posts/${postId}/comments`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function createComment(postId, formData) {
    const data = await axios.post(`${API_URL}/posts/${postId}/comments`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data"
        }
    })
    return data
}

export async function updateComment(postId, commentId, formData) {
    const data = await axios.put(`${API_URL}/posts/${postId}/comments/${commentId}`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data"
        }
    })
    return data
}

export async function deleteComment(postId, commentId) {
    const data = await axios.delete(`${API_URL}/posts/${postId}/comments/${commentId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function getCommentReplies(postId, commentId) {
    const data = await axios.get(
        `${API_URL}/posts/${postId}/comments/${commentId}/replies`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }
    )
    return data
}

export async function createReply(postId, commentId, formData) {
    const data = await axios.post(
        `${API_URL}/posts/${postId}/comments/${commentId}/replies`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }
    )
    return data
}

export async function likeComment(postId, commentId) {
    const data = await axios.put(
        `${API_URL}/posts/${postId}/comments/${commentId}/like`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }
    )
    return data
}