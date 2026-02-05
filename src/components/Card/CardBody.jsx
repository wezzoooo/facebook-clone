import { useDisclosure } from '@heroui/react';
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiMessageRounded, BiShareAlt } from 'react-icons/bi'
import PostDetails from '../PostDetails/PostDetails';

export default function CardBody({post , postDetails , postComments = [] , setPostComments}) {
            const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
    {/* Content */}
            <div className='px-4 pb-3'>
                <p className='text-gray-800'>
                    {post.body}
                </p>
            </div>

            {/* Image */}
            {post.image  && <div className='w-full'>
                <img 
                src={post.image}
                alt='post content'
                className= {`w-full ${postDetails? "": "h-80" } object-cover`}
                />
            </div>}


            {/* Actions */}
            <div className='flex items-center gap-6 px-4 py-3 border-b border-gray-100'>
                <button className='flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors '>
                    <AiOutlineHeart className="w-6 h-6" />
                    <span className='font-medium'>1200</span>
                </button>
                <button className='flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors '>
                    <BiMessageRounded className="w-6 h-6" />
                    <span className='font-medium'>{postComments?.length}</span>
                </button>
                <PostDetails postId={post._id} postComments={postComments} setPostComments={setPostComments} isOpen={isOpen} onOpenChange={onOpenChange}/>
                <button className='flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors '>
                    <BiShareAlt className="w-6 h-6" />
                    <span className='font-medium'>15</span>
                </button>
            </div>
    </>
  )
}
