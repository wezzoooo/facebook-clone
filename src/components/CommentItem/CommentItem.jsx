import { useEffect, useState } from "react"
import { getCommentReplies } from "../../services/commentsServices"
import { createReply } from "../../services/commentsServices"
import { likeComment } from "../../services/commentsServices"
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useContext } from 'react'
import { userContext } from '../../context/UserContext'

export default function CommentItem({ comment, postId }) {

    const [replies, setReplies] = useState([])

    const [replyText, setReplyText] = useState("")
    const [showReply, setShowReply] = useState(false)

    const [likes, setLikes] = useState(comment.likes || [])
    const { userData } = useContext(userContext)

    const isLiked = likes.includes(userData?._id)

    async function handleReply() {
        if (!replyText.trim()) return

        try {
            await createReply(postId, comment._id, { content: replyText })

            const { data } = await getCommentReplies(postId, comment._id)
            setReplies(data?.data?.replies || [])

            setReplyText("")
            setShowReply(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleLikeComment() {
        const alreadyLiked = likes.includes(userData._id)

        setLikes(prev =>
            alreadyLiked
                ? prev.filter(id => id !== userData._id)
                : [...prev, userData._id]
        )

        try {
            await likeComment(postId, comment._id)
        } catch (error) {
            setLikes(prev =>
                alreadyLiked
                    ? [...prev, userData._id]
                    : prev.filter(id => id !== userData._id)
            )
        }
    }


    useEffect(() => {
        async function fetchReplies() {
            const { data } = await getCommentReplies(postId, comment._id)
            setReplies(data?.data?.replies || [])
        }
        fetchReplies()
    }, [postId, comment._id])

    return (
        <div className="ml-4 mt-4">
            <div className="flex items-start gap-3">
                <img
                    src={
                        comment.commentCreator?.photo &&
                            !comment.commentCreator.photo.includes("/undefined")
                            ? comment.commentCreator.photo
                            : "https://via.placeholder.com/40"
                    }
                    className="w-8 h-8 rounded-full"
                />

                <div className="flex-1">
                    <div className="bg-gray-100 px-3 py-2 rounded-xl">
                        <h4 className="text-sm font-semibold">
                            {comment.commentCreator?.name || "User"}
                        </h4>
                        <p className="text-sm">{comment.content}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-sm">
                        <button
                            onClick={() => setShowReply(!showReply)}
                            className="text-blue-500"
                        >
                            Reply
                        </button>

                        <button
                            onClick={handleLikeComment}
                            className="flex items-center gap-1"
                        >
                            {isLiked ? (
                                <AiFillHeart className="text-red-500 w-4 h-4" />
                            ) : (
                                <AiOutlineHeart className="w-4 h-4 text-gray-500" />
                            )}
                            <span>{likes.length}</span>
                        </button>
                    </div>

                    {/* Reply input */}
                    {showReply && (
                        <div className="flex gap-2 mt-2">
                            <input
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="border px-2 py-1 text-sm w-full"
                            />
                            <button onClick={handleReply}>Send</button>
                        </div>
                    )}

                    {/* Replies */}
                    {replies.map(reply => (
                        <div key={reply._id} className="ml-6 mt-2 text-sm text-gray-600">
                            {reply.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}