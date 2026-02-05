
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import { useEffect, useState } from 'react';

export default function PostCard({ post , getPosts }) {

    const [postComments, setPostComments] = useState([])

    useEffect(() => {
        setPostComments(post.comments)
    }, [post.comments])


    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 mt-2">
            {/* Headers */}
            <CardHeader post={post} getPosts={getPosts}/>

            <CardBody post={post} postComments={postComments}/>

            <CardFooter post={post} postComments={postComments} setPostComments={setPostComments}/>
        </div>
    );
}




