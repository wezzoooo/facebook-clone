import { useState } from 'react'
import { BsEmojiSmile, BsSendFill } from 'react-icons/bs'
import { Button } from '@heroui/react'
import { createComment, getPostComments } from '../../services/commentsServices'

export default function CommentInput({ postId, setPostComments }) {
    const [commentMsg, setCommentMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function addComment() {
        if (!commentMsg) return

        setIsLoading(true)
        try {
            await createComment(postId,{
                content: commentMsg
            })

            const { data } = await getPostComments(postId)
            setPostComments(data?.data?.comments || [])

            setCommentMsg("")
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-3 p-4">
            <input
                value={commentMsg}
                onChange={(e) => setCommentMsg(e.target.value)}
                type="text"
                placeholder="Write your comment"
                className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none"
            />

            <Button
                isLoading={isLoading}
                disabled={!commentMsg}
                color="primary"
                onPress={addComment}
            >
                <BsSendFill />
            </Button>

            <button className="text-gray-400 hover:text-yellow-500">
                <BsEmojiSmile />
            </button>
        </div>
    )
}