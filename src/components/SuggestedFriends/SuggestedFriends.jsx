import React, { useEffect, useState, useContext } from "react"
import { getFollowSuggestions, toggleFollow } from "../../services/usersServices"
import { FollowContext } from "../../context/FollowContext"

export default function SuggestedFriends() {

    const [suggestions, setSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { toggleFollow: followFromContext } = useContext(FollowContext)

    async function fetchSuggestions() {
        try {
            setIsLoading(true)

            const { data } = await getFollowSuggestions(10)

            setSuggestions(data?.data?.suggestions || [])

        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchSuggestions()
    }, [])

    async function handleFollow(user) {
        try {
            await followFromContext(user)

            setSuggestions(prev =>
                prev.filter(u => u._id !== user._id)
            )

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-white p-4 rounded-xl max-h-96 overflow-y-auto shadow">

            <h2 className="font-bold mb-3">Suggested Friends</h2>

            {isLoading ? (
                <p className="text-center text-gray-400 text-sm">Loading...</p>
            ) : suggestions.length === 0 ? (
                <p className="text-center text-gray-400 text-sm">
                    No suggestions available
                </p>
            ) : (
                suggestions.map(user => (
                    <div key={user._id} className="flex items-center justify-between mb-3">

                        <div className="flex items-center gap-2">
                            <img
                                src={user.photo}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="text-sm sm:text-base">
                                {user.name}
                            </span>
                        </div>

                        <button
                            onClick={() => handleFollow(user)}
                            className="text-sm text-blue-500 font-semibold"
                        >
                            Follow
                        </button>
                    </div>
                ))
            )}
        </div>
    )
}