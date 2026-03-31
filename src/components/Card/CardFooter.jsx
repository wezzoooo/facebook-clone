import React, { useContext, useState } from 'react'

import { IoChevronDown } from 'react-icons/io5'
import PostDetails from '../PostDetails/PostDetails'
import {
    useDisclosure,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalContent,
    ModalHeader,
    Divider,
    ModalBody,
    Textarea
} from '@heroui/react'

import CommentInput from '../CommentInput/CommentInput'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { userContext } from '../../context/UserContext'
import {
    deleteComment,
    getPostComments,
    updateComment
} from '../../services/commentsServices'
import CommentItem from "../CommentItem/CommentItem"


export default function CardFooter({ post, postComments = [], setPostComments }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { userData } = useContext(userContext)

    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onOpenChange: onEditChange
    } = useDisclosure()

    const [editingComment, setEditingComment] = useState(null)
    const [updatedText, setUpdatedText] = useState('')


    async function getComments() {

        
        try {
            const { data } = await getPostComments(post._id)
            setPostComments(data?.data?.comments || [])
            
        } catch (error) {
            console.log(error)
        }
    }


    async function updateUserComment(commentId, updatedContent) {
    try {
        await updateComment(
            post._id,
            commentId,
            { content: updatedContent }
        )

        getComments()
    } catch (error) {
        console.log(error)
    }
}


    async function deleteUserComment(commentId) {
    try {
        await deleteComment(post._id, commentId)
        getComments()
    } catch (error) {
        console.log(error)
    }
}


    return (
        <>
            {/* Input */}
            <CommentInput
                postId={post._id}
                setPostComments={setPostComments}
            />

            {/* Preview */}
            {(postComments?.length || 0) > 0 && (
                <div className="p-4">

                    {postComments.slice(0, 1).map(comment => (
                        <div key={comment._id} className="relative">


                            <CommentItem
                                comment={comment}
                                postId={post._id}
                            />


                            {(userData?._id === comment.commentCreator?._id) && (
                                <div className="absolute right-2 top-2">
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <BsThreeDotsVertical className="cursor-pointer" />
                                        </DropdownTrigger>

                                        <DropdownMenu>
                                            <DropdownItem
                                                key="edit"
                                                onPress={() => {
                                                    setEditingComment(comment)
                                                    setUpdatedText(comment.content)
                                                    onEditOpen()
                                                }}
                                            >
                                                Edit
                                            </DropdownItem>

                                            <DropdownItem
                                                key="delete"
                                                color="danger"
                                                onPress={() => deleteUserComment(comment._id)}
                                            >
                                                Delete
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* View All */}
                    <button
                        onClick={onOpen}
                        className='flex items-center gap-2 text-gray-500 text-sm mt-3 mx-auto hover:text-gray-700'
                    >
                        View all Comments
                        <IoChevronDown className='w-4 h-4' />
                    </button>

                    {/* Modal */}
                    <PostDetails
                        postId={post._id}
                        postComments={postComments}
                        setPostComments={setPostComments}
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                    />
                </div>
            )}

            {/*  Edit Modal */}
            <Modal isOpen={isEditOpen} onOpenChange={onEditChange}>
                <ModalContent>
                    <ModalHeader>Edit Comment</ModalHeader>

                    <ModalBody>
                        <Textarea
                            value={updatedText}
                            onChange={(e) => setUpdatedText(e.target.value)}
                        />

                        <Button onPress={() => {
                            updateUserComment(editingComment._id, updatedText)
                            onEditChange(false)
                        }}>
                            Save
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}