
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/UserContext'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostCard from '../../components/PostCard/PostCard'
import { getAllPosts } from '../../services/postsServices'
import FriendsList from '../../components/FriendsList/FriendsList'

export default function UserProfile() {
    const { userData } = useContext(userContext)
    const [userPosts, setUserPosts] = useState([])

    async function fetchUserPosts() {
        try {
            const { data } = await getAllPosts()

            const posts = data?.data?.posts || []

            if (!userData?._id) return

            const filtered = posts.filter(
                post => post.user?._id === userData._id
            )

            setUserPosts(filtered)
        } catch (error) {
            console.log(error)
            setUserPosts([])
        }
    }

    useEffect(() => {
        if (userData?._id) {
            fetchUserPosts()
        }
    }, [userData?._id])

    return (
        <div className="bg-gray-100 min-h-screen">

            <div className="bg-white shadow">
                <ProfileHeader />
            </div>

            <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-4">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    {/* LEFT */}
                    <div className="hidden lg:flex flex-col gap-4">
                        <div className="p-4 shadow rounded-lg bg-white">Intro</div>
                        <div className="p-4 shadow rounded-lg bg-white">Photos</div>
                        <FriendsList/>
                    </div>

                    {/* POSTS */}
                    <div className="lg:col-span-2 flex flex-col gap-4">

                        <CreatePost getPosts={fetchUserPosts} />

                        {userPosts.length === 0 ? (
                            <p className="text-center text-gray-400 mt-4">
                                No posts yet
                            </p>
                        ) : (
                            userPosts.map(post => (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                    getPosts={fetchUserPosts}
                                />
                            ))
                        )}
                    </div>

                </div>

            </div>
        </div>
    )
}