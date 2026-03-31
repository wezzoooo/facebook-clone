import axios from 'axios'


const API_URL = import.meta.env.VITE_API_BASE_URL


export async function getLoggedUserData() {
    const data = await axios.get(`${API_URL}/users/profile-data`, {

        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function uploadUserProfile(formData) {
    const data = await axios.put(`${API_URL}/users/upload-photo`, formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            },
        }
    );

    return data;
}

export async function toggleFollow(userId) {
    const data = await axios.put(`${API_URL}/users/${userId}/follow`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function getFollowSuggestions(limit = 10) {
    const data = await axios.get(`/users/suggestions?limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}
