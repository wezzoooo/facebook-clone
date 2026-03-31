import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { userContext } from '../../context/UserContext'
import { deletePost, bookmarkPost } from '../../services/postsServices'
import CreatePostModal from '../CreatePost/CreatePostModal'
import { toast } from "react-toastify"
import { FollowContext } from '../../context/FollowContext'
import { BookmarksContext } from "../../context/BookmarksContext"



export default function CardHeader({ post, getPosts }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { userData } = useContext(userContext)


    const { following, toggleFollow } = useContext(FollowContext)

    const isFollowing = following.some(u => u._id === post.user._id)

    const { bookmarkedPosts, setBookmarkedPosts , fetchBookmarks } = useContext(BookmarksContext)

const isBookmarked = bookmarkedPosts.some(p => p._id === post._id)

    async function deleteUserPost() {
        try {
            const { data } = await deletePost(post._id)
            getPosts()
        } catch (error) {
            console.log(error);

        }
    }

    async function handleBookmark() {
    const exists = bookmarkedPosts.find(p => p._id === post._id)

    setBookmarkedPosts(prev =>
        exists
            ? prev.filter(p => p._id !== post._id)
            : [...prev, post]
    )

    try {
        await bookmarkPost(post._id)
    } catch (error) {
        setBookmarkedPosts(prev =>
            exists
                ? [...prev, post]
                : prev.filter(p => p._id !== post._id)
        )
    }
}

    async function handleFollow() {
        toggleFollow(post.user)
    }

    return (
        <>
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <img
                        src={post.user.photo}
                        alt={post.user.name}
                        className='w-12 h-12 rounded-full object-cover'
                    />
                    <div>
                        <h3 className='font-semibold text-gray-900'>{post.user.name}</h3>
                        <p className='text-sm text-gray-500'>{new Date(post.createdAt).toLocaleString("en", { dateStyle: "full", timeStyle: "short" })}</p>
                    </div>
                    {userData._id !== post.user._id && (
                        <button
                            onClick={handleFollow}
                            className={`cursor-pointer px-3 py-1 rounded-lg text-sm ${isFollowing ? "bg-gray-300" : "bg-blue-500 text-white"
                                }`}
                        >
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBookmark}
                        className="text-xl transition"
                    >
                        {isBookmarked ? (
                            <BsBookmarkFill className="text-yellow-400" />
                        ) : (
                            <BsBookmark className="text-gray-500 hover:text-yellow-400" />
                        )}
                    </button>

                    {userData._id == post.user._id ? <Dropdown placement="bottom-end">
                        <DropdownTrigger className="cursor-pointer">
                            <BsThreeDotsVertical className='w-5 h-5' />

                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">

                            <DropdownItem onPress={onOpen} key="edit">
                                Edit
                            </DropdownItem>
                            <DropdownItem onPress={deleteUserPost} key="delete" color="danger">
                                Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown> : ""}
                </div>
            </div>
            <CreatePostModal post={post} callback={getPosts} isOpen={isOpen} onOpenChange={onOpenChange} />

        </>

    )
}