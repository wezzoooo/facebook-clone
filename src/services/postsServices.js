import axios from 'axios'


const API_URL = import.meta.env.VITE_API_BASE_URL

export async function getAllPosts() {
    const data = await axios.get(`${API_URL}/posts?limit=50&sort=-createdAt`, {
        headers: {
            "token": localStorage.getItem("userToken")
        }
    })
    return data

}
export async function getPostDetails(postId) {
    const data = await axios.get(`${API_URL}/posts/${postId}`, {
        headers: {
            "token": localStorage.getItem("userToken")
        }
    })
    return data

}
export async function createPost(formData) {
    const data = await axios.post(`${API_URL}/posts`, formData, {

        headers: {
            "token": localStorage.getItem("userToken")

        }
    })
    return data

}


export async function updatePost(postId, formData) {
    const data = await axios.put(`${API_URL}/posts/${postId}`, formData, {

        headers: {
            "token": localStorage.getItem("userToken")

        }
    })
    return data

}


export async function deletePost(postId) {
    const data = await axios.delete(`${API_URL}/posts/${postId}`, {

        headers: {
            "token": localStorage.getItem("userToken")

        }
    })
    return data

}


export async function getLoggedUserData() {
    const data = await axios.get(`${API_URL}/users/profile-data`, {

        headers: {
            "token": localStorage.getItem("userToken")

        }
    })
    return data

}


export async function uploadUserProfile(formData) {
    const data = await axios.put(`${API_URL}/users/upload-photo`, formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "token": localStorage.getItem("userToken")
            },
        }
    );

    return data;
}

export async function changePassword(formData) {
    return axios.patch(`${API_URL}/users/change-password`,
        {
            password: formData.password,
            newPassword: formData.newPassword,
        },
        {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        }
    );
}

