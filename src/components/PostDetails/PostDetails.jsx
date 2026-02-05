import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Divider,
} from "@heroui/react";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import { getPostDetails } from "../../services/postsServices";
import PostSkeleton from "../PostSkeleton/PostSkeleton";
import commentCreatorIcon from '../../assets/images/free-user-icon-3296-thumb.png'
import CommentInput from "../CommentInput/CommentInput";


export default function PostDetails({ isOpen, onOpenChange, postId, postComments, setPostComments }) {

    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(false)



    async function getDetails() {
        setIsLoading(true)
        try {
            const { data } = await getPostDetails(postId)
            setPost(data.post)

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


    return (
        <div className="flex flex-col gap-2">

            <Modal isOpen={isOpen} scrollBehavior={"inside"} onOpenChange={onOpenChange}>
                <ModalContent className="max-w-3xl">

                    <>
                        <ModalHeader className="flex flex-col gap-1">Post Details</ModalHeader>
                        <Divider />
                        {isLoading ? <PostSkeleton /> : <>
                            {post && <>
                                <ModalBody>
                                    <CardHeader post={post} />
                                    <CardBody postComments={postComments} postDetails post={post} />
                                    <>
                                        {/* Comment Input */}
                                        <CommentInput postId={postId} setPostComments={setPostComments}/>

                                        {/* Comments */}
                                        {post.comments.length > 0 && <>
                                            {postComments.map((comment) => <>
                                                <div key={comment._id} className="p-4">
                                                    <div className="flex items-start gap-3">
                                                        <img
                                                            src={comment.commentCreator.photo.includes("/undefined") ? commentCreatorIcon : comment.commentCreator.photo}
                                                            alt="Sara Ahmed"
                                                            className='w-10 h-10 rounded-full object-cover'
                                                        />
                                                        <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3">
                                                            <h4 className='font-semibold text-sm text-gray-900'>{comment.commentCreator.name}</h4>
                                                            <p className='text-sm text-gray-700 mt-1'>
                                                                {comment.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>)}
                                        </>}
                                    </>
                                </ModalBody>
                            </>
                            }
                        </>}
                    </>
                </ModalContent>
            </Modal>
        </div>
    );
}


