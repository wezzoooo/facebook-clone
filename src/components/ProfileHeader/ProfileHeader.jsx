import React, { useContext, useRef, useState } from 'react'
import { userContext } from '../../context/UserContext'
import { uploadUserProfile } from '../../services/usersServices'
import { Spinner, useDisclosure, Modal, ModalContent, ModalBody } from "@heroui/react";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import { BookmarksContext } from "../../context/BookmarksContext"


export default function ProfileHeader() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { userData, setUserData } = useContext(userContext)
    const [isUploading, setIsUploading] = useState(false)
    const {
        isOpen: isBookmarkOpen,
        onOpen: openBookmarks,
        onOpenChange: onBookmarkChange
    } = useDisclosure();

    const { bookmarkedPosts, isLoading } = useContext(BookmarksContext)

    const fileInput = useRef()

    function openFileInput() {
        fileInput.current.click()
    }

    async function handleFileChange(e) {
        const file = e.target.files[0]
        if (!file) return
        if (file.size > 4 * 1024 * 1024) {
            alert("File size exceeds 4MB")
            return
        }
        const formData = new FormData()
        formData.append("photo", file)

        try {
            setIsUploading(true)
            const data = await uploadUserProfile(formData)
            setUserData(prev => ({ ...prev, photo: data.photo }))
        } catch (error) {
            console.log("Error uploading profile photo:", error)
        } finally {
            setIsUploading(false)
        }
    }


    return (
        <div>
            <div className="w-full flex justify-center" style={{ height: '348px' }}>
                <div className="flex flex-col">
                    <div
                        className="relative bg-gray-100 md:rounded-bl-lg rounded-br-lg"
                        style={{ width: '940px', height: '348px', background: "linear-gradient(90deg,rgba(180, 58, 170, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)" }}
                    >
                        <img
                            src={userData?.photo}
                            className="rounded-full absolute top-50 inset-x-96 border-4 border-white w-40 h-40 cursor-pointer hover:opacity-80 transition"
                            style={{ width: '168px', height: '168px' }}
                            alt="Profile"
                            onClick={openFileInput}
                        />
                        <input
                            type="file"
                            ref={fileInput}
                            onChange={handleFileChange}
                            hidden
                        />
                        {isUploading && <Spinner label="Loading..." className='absolute top-72 inset-x-96 text-center' />}


                        <button
                            onClick={openBookmarks}
                            className="absolute top-4 right-4 text-white text-sm bg-black/30 px-2 py-1 rounded"
                        >
                            Saved
                        </button>
                    </div>
                </div>
            </div>

            {/* Infos */}
            <div className="flex justify-center flex-col mt-5 mb-3.5">
                <h1 className="text-center font-bold text-3xl">{userData.name || "User Name"}</h1>
                <a href="#" className="text-center text-blue-700 font-semibold">
                    {userData.bio || "Add Bio"}
                </a>
                <hr className="full flex self-center w-2/3 mt-2" />
            </div>

            {/* Tabs */}
            <div className="w-full flex justify-center">
                <div className="flex justify-between mb-2.5">
                    <ul className="flex px-5 py-1.5">
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Posts</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">About</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Friends</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Photos</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Story Archive</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">More</a></li>
                    </ul>
                    <ul className="flex md:pl-14">
                        <li className="px-2 font-semibold">
                            <button className="bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold">
                                Add to Story
                            </button>
                        </li>
                        <li className="px-2 font-semibold">
                            <button onClick={onOpen} className="bg-gray-200 px-5 py-1 rounded-lg text-black font-semibold cursor-pointer">
                                Edit Profile
                            </button>
                            <ChangePasswordModal isOpen={isOpen} onOpenChange={onOpenChange}
                            />
                        </li>
                        <li className="px-2 font-semibold">
                            <button className="bg-gray-200 px-3 py-1 rounded-lg text-black font-semibold">
                                ...
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <Modal isOpen={isBookmarkOpen} onOpenChange={onBookmarkChange}>
                <ModalContent>
                    <ModalBody className="p-4">

                        <h2 className="text-lg font-bold mb-3">
                            Saved Items
                        </h2>

                        {isLoading ? (
                            <p>Loading...</p>
                        ) : bookmarkedPosts.length === 0 ? (
                            <div className="text-center text-gray-400">
                                No bookmarks yet
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">

                                {bookmarkedPosts.map(post => (
                                    <div key={post._id} className="mb-4 border rounded p-2">

                                        <div className="flex items-center gap-2 mb-2">
                                            <img src={post.user.photo} className="w-8 h-8 rounded-full" />
                                            <span className="font-semibold">{post.user.name}</span>
                                        </div>

                                        <p>{post.body}</p>

                                        {post.image && (
                                            <img src={post.image} className="w-full h-40 object-cover mt-2" />
                                        )}

                                    </div>
                                ))}

                            </div>
                        )}

                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}
