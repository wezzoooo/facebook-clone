import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL

export async function getAllPosts() {
    const data = await axios.get(`${API_URL}/posts`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data;
}

export async function getFeedPosts(limit = 10) {
    const data = await axios.get(`${API_URL}/posts/feed?limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data;
}

export async function getPostDetails(postId) {
    const data = await axios.get(`${API_URL}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data;
}

export async function createPost(formData) {
    const data = await axios.post(`${API_URL}/posts`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data"
        }
    })
    return data;
}

export async function updatePost(postId, formData) {
    const data = await axios.put(`${API_URL}/posts/${postId}`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data"
        }
    })
    return data;
}

export async function deletePost(postId) {
    const data = await axios.delete(`${API_URL}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data;
}

export async function likePost(postId) {
    const data = await axios.put(`${API_URL}/posts/${postId}/like`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data;
}

export async function getPostLikes(postId, page = 1, limit = 20) {
    const data = await axios.get(`${API_URL}/posts/${postId}/likes?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data;
}

export async function sharePost(postId, body) {
    const data = await axios.post(`${API_URL}/posts/${postId}/share`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function bookmarkPost(postId) {
    const data = await axios.put(`${API_URL}/posts/${postId}/bookmark`, {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
    return data;
}