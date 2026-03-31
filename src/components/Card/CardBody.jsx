import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiMessageRounded, BiShareAlt } from 'react-icons/bi'
import { useState, useContext } from 'react'
import { useDisclosure } from '@heroui/react'
import PostDetails from '../PostDetails/PostDetails'
import { likePost } from '../../services/postsServices'
import { userContext } from '../../context/UserContext'
import { sharePost } from '../../services/postsServices'
import { toast } from 'react-toastify'

export default function CardBody({ post, postDetails, postComments = [], setPostComments }) {
    const { userData } = useContext(userContext)
    const [likes, setLikes] = useState(post?.likes || [])
    const [isLiking, setIsLiking] = useState(false)

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const isLiked = likes.includes(userData?._id)

    const displayedPost = post.sharedPost || post

    async function handleLike() {
        if (!userData?._id) return

        const alreadyLiked = likes.includes(userData._id)

        setLikes(prev =>
            alreadyLiked
                ? prev.filter(id => id !== userData._id)
                : [...prev, userData._id]
        )

        try {
            await likePost(post._id)
        } catch (error) {
            console.log(error)

            setLikes(prev =>
                alreadyLiked
                    ? [...prev, userData._id]
                    : prev.filter(id => id !== userData._id)
            )
        }
    }

    async function handleShare() {
        try {
            await sharePost(post._id)
            toast.success("Post Shared Successfully")
        } catch (error) {

            if (error.response?.status === 409) {
                toast.error("You already shared this post")
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <>
            <div className='px-4 pb-3'>
                <p>{post.body}</p>

                {post.sharedPost && (
                    <div className="border p-3 mt-2 rounded">
                        <p className="text-sm text-gray-500">
                            Shared Post:
                        </p>
                        <p>{post.sharedPost.body}</p>
                    </div>
                )}
            </div>

            {displayedPost.image && (
                <img
                    src={displayedPost.image}
                    className={`w-full ${postDetails ? "" : "h-80"} object-cover`}
                />
            )}

            <div className='flex items-center gap-6 px-4 py-3'>

                {/* LIKE */}
                <button
                    onClick={handleLike}
                    className="flex items-center gap-2"
                >
                    {isLiked ? (
                        <AiFillHeart className="w-6 h-6 text-red-500" />
                    ) : (
                        <AiOutlineHeart className="w-6 h-6 text-gray-600" />
                    )}
                    <span>{likes.length}</span>
                </button>

                {/* COMMENTS */}
                <button
                    onClick={onOpen}
                    className='flex items-center gap-2 text-gray-600'
                >
                    <BiMessageRounded className="w-6 h-6" />
                    <span>{postComments?.length || 0}</span>
                </button>

                {/* SHARE */}
                <button
                    onClick={handleShare}
                    className='flex items-center gap-2 text-gray-600'
                >
                    <BiShareAlt className="w-6 h-6" />
                </button>
            </div>

            <PostDetails
                postId={post._id}
                postComments={postComments}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                setPostComments={setPostComments}
            />
        </>
    )
}