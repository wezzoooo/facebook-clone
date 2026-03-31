import { createContext, useEffect, useState } from 'react'
import { getAllPosts } from '../services/postsServices'

export const BookmarksContext = createContext()

export default function BookmarksProvider({ children }) {

    const [bookmarkedPosts, setBookmarkedPosts] = useState([])

    async function loadBookmarks() {
        try {
            const { data } = await getAllPosts()

            const bookmarked = data.data.posts.filter(p => p.isBookmarked)

            setBookmarkedPosts(bookmarked)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadBookmarks()
    }, [])

    return (
        <BookmarksContext.Provider value={{
            bookmarkedPosts,
            setBookmarkedPosts
        }}>
            {children}
        </BookmarksContext.Provider>
    )
}