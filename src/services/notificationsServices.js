import axios from "axios"

const API_URL = import.meta.env.VITE_API_BASE_URL

export async function getNotifications(page = 1, limit = 10) {
    return await axios.get(
        `${API_URL}/notifications?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }
    )
}

export async function getUnreadCount() {
    return await axios.get(`${API_URL}/notifications/unread-count`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
}

export async function markAsRead(notificationId) {
    return await axios.patch(
        `${API_URL}/notifications/${notificationId}/read`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }
    )
}

export async function markAllAsRead() {
    return await axios.patch(
        `${API_URL}/notifications/read-all`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }
    )
}