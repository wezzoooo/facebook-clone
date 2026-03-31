import React, { useEffect, useState, useContext } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Divider,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Textarea,
    useDisclosure
} from "@heroui/react";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import { getPostDetails } from "../../services/postsServices";
import PostSkeleton from "../PostSkeleton/PostSkeleton";
import commentCreatorIcon from '../../assets/images/free-user-icon-3296-thumb.png'
import CommentInput from "../CommentInput/CommentInput";
import CommentItem from "../CommentItem/CommentItem";
import { userContext } from "../../context/UserContext"
import { getPostComments, deleteComment, updateComment } from "../../services/commentsServices"
import { BsThreeDotsVertical } from "react-icons/bs"


export default function PostDetails({ isOpen, onOpenChange, postId, postComments, setPostComments }) {

    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { userData } = useContext(userContext)

    const [editingComment, setEditingComment] = useState(null)
    const [updatedText, setUpdatedText] = useState("")

    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onOpenChange: onEditChange
    } = useDisclosure()



    async function getDetails() {
        setIsLoading(true)
        try {
            const { data } = await getPostDetails(postId)
            setPost(data.data.post)

            const commentsRes = await getPostComments(postId)
            setPostComments(commentsRes.data.data.comments)

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)

        }

    }

    useEffect(() => {
        if (isOpen && postId) {
            getDetails()
        }
    }, [isOpen, postId])

    async function deleteUserComment(commentId) {
        try {
            await deleteComment(post._id, commentId)
            const commentsRes = await getPostComments(post._id)
            setPostComments(commentsRes.data.data.comments)
        } catch (err) {
            console.log(err)
        }
    }

    async function updateUserComment(commentId, updatedContent) {
        try {
            await updateComment(post._id, commentId, {
                content: updatedContent
            })

            const commentsRes = await getPostComments(post._id)
            setPostComments(commentsRes.data.data.comments)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="flex flex-col gap-2">

            <Modal isOpen={isOpen} scrollBehavior={"inside"} onOpenChange={onOpenChange}>
                <ModalContent className="max-w-3xl">

                    <>
                        <ModalHeader className="flex flex-col gap-1">Post Details</ModalHeader>
                        <Divider />
                        {isLoading ? (<PostSkeleton />) : <>
                            {post && <>
                                <ModalBody>
                                    <CardHeader post={post} />
                                    <CardBody postComments={postComments} postDetails post={post} />
                                    <>
                                        {/* Comment Input */}
                                        <CommentInput
                                            postId={post._id}
                                            setPostComments={setPostComments}
                                        />
                                        {/* Comments */}
                                        {postComments?.length > 0 ? (
                                            postComments.map(comment => (
                                                <div key={comment._id} className="relative">

                                                    <CommentItem
                                                        comment={comment}
                                                        postId={post._id}
                                                    />

                                                    {/* Edit / Delete */}
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
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-400 mt-4">
                                                No comments yet
                                            </p>
                                        )}
                                    </>
                                </ModalBody>
                            </>
                            }
                        </>}
                    </>
                </ModalContent>
            </Modal>
            <Modal isOpen={isEditOpen} onOpenChange={onEditChange}>
                <ModalContent>
                    <ModalHeader>Edit Comment</ModalHeader>

                    <ModalBody>
                        <Textarea
                            value={updatedText}
                            onChange={(e) => setUpdatedText(e.target.value)}
                        />

                        <Button
                            onPress={() => {
                                updateUserComment(editingComment._id, updatedText)
                                onEditChange(false)
                            }}
                        >
                            Save
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}




