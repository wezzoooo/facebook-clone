import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import { useEffect, useState } from 'react'
import { getPostComments } from '../../services/commentsServices'

export default function PostCard({ post, getPosts }) {

    const [postComments, setPostComments] = useState([])

    useEffect(() => {
        if (!post?._id) return

        async function fetchComments() {
            try {
                const { data } = await getPostComments(post._id)
                setPostComments(data?.data?.comments || [])
            } catch (error) {
                console.log(error)
            }
        }

        fetchComments()

    }, [post._id])


    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 mt-2">

            <CardHeader post={post} getPosts={getPosts} />

            <CardBody
                post={post}
                postComments={postComments}
                setPostComments={setPostComments}
            />

            <CardFooter
                post={post}
                postComments={postComments}
                setPostComments={setPostComments}
            />

        </div>
    )
}