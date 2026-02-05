import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import PostCard from '../../components/PostCard/PostCard'
import { getAllPosts } from '../../services/postsServices'
import PostSkeleton from '../../components/PostSkeleton/PostSkeleton'
import PostDetails from '../../components/PostDetails/PostDetails'
import CreatePost from '../../components/CreatePost/CreatePost'

export default function NewsFeed() {

  const [posts, setPosts] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function getPosts() {
    setIsLoading(true)
    try {
      const { data } = await getAllPosts()
      setPosts(data?.posts)


    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false)

    }

  }

  useEffect(() => {
    getPosts()
  }, [])
  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-4 ">
            <div className="col-span-1">
              <div className="sticky top-16">
                <Sidebar />
              </div>
            </div>
            <div className="col-span-2 pt-2">

              {isLoading ? [...Array(5)].map(() => <PostSkeleton />) : <>
                <CreatePost getPosts={getPosts} />
                {posts && posts.map((post) => <PostCard getPosts={getPosts} post={post} key={post._id} />)}
              </>}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
