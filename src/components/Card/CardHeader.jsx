import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@heroui/react'
import React, { useContext } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { userContext } from '../../context/UserContext'
import CreatePostModal from '../CreatePost/CreatePostModal';
import { deletePost } from '../../services/postsServices';



export default function CardHeader({ post , getPosts }) {
        const { isOpen, onOpen, onOpenChange } = useDisclosure();
        const { userData } = useContext(userContext)
    
    async function deleteUserPost() {
        try {
            const {data} = await deletePost(post._id)
            getPosts()
        } catch (error) {
            console.log(error);
            
        }
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
                </div>
                {/* <button className='text-gray-500 hover:text-gray-700'>
                    <BsThreeDotsVertical className='w-5 h-5' />
                </button> */}
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
            <CreatePostModal post={post} callback={getPosts} isOpen={isOpen} onOpenChange={onOpenChange} />

        </>

    )
}
