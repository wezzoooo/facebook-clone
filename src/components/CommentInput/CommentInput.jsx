import { useState } from 'react'
import { BsEmojiSmile, BsSendFill } from 'react-icons/bs'
import { Button } from '@heroui/react'
import { createComment } from '../../services/commentsServices'

export default function CommentInput({ postId, setPostComments }) {
    const [commentMsg, setCommentMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function addComment() {
        if (!commentMsg) return

        setIsLoading(true)
        try {
            const { data } = await createComment({
                content: commentMsg,
                post: postId
            })
            setPostComments(data.comments)
            setCommentMsg("")
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <input
                value={commentMsg}
                onChange={(e) => setCommentMsg(e.target.value)}
                type="text"
                placeholder="Write your comment"
                className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Button
                isLoading={isLoading}
                disabled={!commentMsg}
                color="primary"
                onPress={addComment}
            >
                <BsSendFill className="w-5 h-5" />
            </Button>

            <button className="text-gray-400 hover:text-yellow-500">
                <BsEmojiSmile className="w-5 h-5" />
            </button>
        </div>
    )
}
