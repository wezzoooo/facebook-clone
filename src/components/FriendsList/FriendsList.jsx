import React, { useContext } from 'react'
import { FollowContext } from '../../context/FollowContext'

export default function FriendsList() {

    const { following, toggleFollow } = useContext(FollowContext)

    return (
        <div className="bg-white p-4 rounded-xl max-h-96 overflow-y-auto shadow">

            <h2 className="font-bold mb-3">Friends</h2>

            {following.length === 0 ? (
                <p className="text-center text-gray-400 text-sm">
                    No friends yet
                </p>
            ) : (
                following.map(user => (
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
                            onClick={() => toggleFollow(user)}
                            className="text-sm text-red-500"
                        >
                            Unfollow
                        </button>
                    </div>
                ))
            )}
        </div>
    )
}