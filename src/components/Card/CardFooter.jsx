import React, { useContext, useState } from 'react'

import { IoChevronDown } from 'react-icons/io5'
import PostDetails from '../PostDetails/PostDetails'
import { useDisclosure, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, Divider, ModalBody, Textarea } from '@heroui/react'

import CommentInput from '../CommentInput/CommentInput'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { userContext } from '../../context/UserContext'
import { deleteComment, getPostComments, updateComment } from '../../services/commentsServices'


export default function CardFooter({ post, postComments, setPostComments }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { userData } = useContext(userContext)

    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditChange } = useDisclosure();
    const [editingComment, setEditingComment] = useState(null);
    const [updatedText, setUpdatedText] = useState('');



    async function updateUserComment(commentId, updatedContent) {
        try {

            const { data } = await updateComment({ content: updatedContent }, commentId);

            getComments();
        } catch (error) {
            console.log(error);
        }
    }


    async function deleteUserComment(commentId) {
        try {
            const { data } = await deleteComment(commentId)
            getComments()
        } catch (error) {
            console.log(error);

        }
    }

    async function getComments() {
        try {
            const { data } = await getPostComments(post._id)
            setPostComments(data.comments)
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <>
            {/* Comment Input */}
            <CommentInput postId={post._id} setPostComments={setPostComments} />

            {/* Comments */}
            {postComments.length != 0 &&
                <div className="p-4">
                    <div className="flex items-start gap-3">
                        <img
                            src={postComments[0].commentCreator.photo.includes("/undefined") ? post.user.photo : postComments[0].commentCreator.photo}
                            alt="user"
                            className='w-10 h-10 rounded-full object-cover'
                        />
                        <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3">
                            <h4 className='font-semibold text-sm text-gray-900'>{postComments[0].commentCreator.name}</h4>
                            <p className='text-sm text-gray-700 mt-1'>
                                {postComments[0].content}
                            </p>
                        </div>
                        {(userData?._id === postComments[0]?.commentCreator?._id ||
                            userData?._id === post?.user?._id) && (
                                <Dropdown placement="bottom-end">
                                    <DropdownTrigger className="cursor-pointer mt-2">
                                        <BsThreeDotsVertical className='w-5 h-5' />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                                        <DropdownItem key="edit" onPress={() => {
                                            setEditingComment(postComments[0]); 
                                            setUpdatedText(postComments[0].content);
                                            onEditOpen();
                                        }}>
                                            Edit
                                        </DropdownItem>
                                        <DropdownItem onPress={() => {
                                            deleteUserComment(postComments[0]._id)
                                        }} key="delete" color="danger">Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            )}
                    </div>
                    <button onClick={onOpen} className='flex items-center gap-2 text-gray-500 text-sm mt-3 mx-auto hover:text-gray-700'>
                        View all Comments
                        <IoChevronDown className='w-4 h-4' />
                    </button>
                    <PostDetails postComments={postComments} postId={post._id} isOpen={isOpen} onOpenChange={onOpenChange} setPostComments={setPostComments} />
                </div>}

                {/* Edit Comment Modal */}
            <Modal isOpen={isEditOpen} onOpenChange={onEditChange}>
                <ModalContent className="max-w-xl">
                    <ModalHeader>Edit Comment</ModalHeader>
                    <Divider />
                    <ModalBody>
                        <Textarea
                            value={updatedText}
                            onChange={(e) => setUpdatedText(e.target.value)}
                            placeholder="Edit your comment"
                        />
                    </ModalBody>
                    <Divider />
                    <Button
                        className="m-4"
                        color="primary"
                        onPress={() => {
                            updateUserComment(editingComment._id, updatedText)
                            onEditChange(false)
                        }}
                    >
                        Save
                    </Button>
                </ModalContent>
            </Modal>
        </>
    )
}



