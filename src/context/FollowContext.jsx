import { createContext, useEffect, useState } from "react"
import { toggleFollow as followAPI, getLoggedUserData } from "../services/usersServices"
import { getAllPosts } from "../services/postsServices"

export const FollowContext = createContext()

export default function FollowProvider({ children }) {

    const [followingIds, setFollowingIds] = useState([])
    const [followingUsers, setFollowingUsers] = useState([])

    async function loadFollowing() {
        try {
            const { data } = await getLoggedUserData()

            const ids = data.data.user.following || []
            setFollowingIds(ids)

            const postsRes = await getAllPosts()

            const usersMap = {}

            postsRes.data.data.posts.forEach(post => {
                if (ids.includes(post.user?._id)) {
                    usersMap[post.user._id] = post.user
                }
            })

            setFollowingUsers(Object.values(usersMap))

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadFollowing()
    }, [])

    async function toggleFollow(user) {
        const userId = typeof user === "string" ? user : user._id

        const exists = followingIds.includes(userId)

        setFollowingIds(prev =>
            exists
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        )


        if (typeof user !== "string") {
            setFollowingUsers(prev =>
                exists
                    ? prev.filter(u => u._id !== userId)
                    : [...prev, user]
            )
        }

        try {
            await followAPI(userId)

            loadFollowing()

        } catch (err) {
            console.log(err)

            // rollback
            setFollowingIds(prev =>
                exists
                    ? [...prev, userId]
                    : prev.filter(id => id !== userId)
            )
        }
    }

    return (
        <FollowContext.Provider value={{
            following: followingUsers,
            toggleFollow
        }}>
            {children}
        </FollowContext.Provider>
    )
}