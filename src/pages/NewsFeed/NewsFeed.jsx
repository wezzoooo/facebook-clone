import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import PostCard from '../../components/PostCard/PostCard'
import { getAllPosts, getFeedPosts } from '../../services/postsServices'
import PostSkeleton from '../../components/PostSkeleton/PostSkeleton'
import PostDetails from '../../components/PostDetails/PostDetails'
import CreatePost from '../../components/CreatePost/CreatePost'

export default function NewsFeed() {

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getPosts() {
    setIsLoading(true)
    try {
      const { data } = await getAllPosts()
      setPosts(data?.data?.posts || [])
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

          {/* Sidebar */}
          <div className="hidden lg:block col-span-1">
            <div className="sticky top-16">
              <Sidebar />
            </div>
          </div>

          {/* Feed */}
          <div className="col-span-1 lg:col-span-2 pt-2 space-y-4">

            <CreatePost getPosts={getPosts} />

            {isLoading
              ? [...Array(5)].map((_, i) => <PostSkeleton key={i} />)
              : posts.map(post => (
                  <PostCard
                    key={post._id}
                    post={post}
                    getPosts={getPosts}
                  />
                ))
            }
          </div>

        </div>
      </div>
    </main>
  )
}