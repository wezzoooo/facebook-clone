
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/UserContext'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostCard from '../../components/PostCard/PostCard'
import { getAllPosts } from '../../services/postsServices'

export default function UserProfile() {
    const { userData } = useContext(userContext)
    const [userPosts, setUserPosts] = useState([])

    async function fetchUserPosts() {
        try {
            const { data } = await getAllPosts()

            const posts = data?.posts || []

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
        <div className="h-screen bg-gray-100">
            <div className=" shadow bg-white">
                {/* PROFILE HEADER */}
                <ProfileHeader />

                <div className="flex justify-center gap-8 mt-4">
                    {/* LEFT */}
                    <div className="w-80 flex flex-col gap-4">
                        <div className="p-4 shadow rounded-lg bg-white">Intro</div>
                        <div className="p-4 shadow rounded-lg bg-white">Photos</div>
                        <div className="p-4 shadow rounded-lg bg-white">Friends</div>
                    </div>

                    {/* POSTS */}
                    <div className="w-2/5 flex flex-col gap-4">
                        {/* Create Post */}
                        <CreatePost getPosts={fetchUserPosts} />

                        {/* Post List */}
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
