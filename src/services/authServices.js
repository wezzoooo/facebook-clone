import axios from 'axios'


const API_URL = import.meta.env.VITE_API_BASE_URL 

export async function registerUser(formData) {
    const data = await axios.post(`${API_URL}/users/signup`,formData)
    return data

}
export async function loginUser(formData) {
    const data = await axios.post(`${API_URL}/users/signin`,formData)
    return data

}

export async function changePassword(formData) {
    const data = await axios.patch(`${API_URL}/users/change-password`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}