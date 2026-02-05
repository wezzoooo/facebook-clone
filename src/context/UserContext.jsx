import React, { createContext, useContext, useEffect, useState } from 'react'
import { getLoggedUserData } from '../services/postsServices'
import { authContext } from './AuthContext'


export const userContext = createContext()

export default function UserContextProvider({ children }) {

    const [userData, setUserData] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {token}= useContext(authContext)

    async function getUserData() {

        try {
            setIsLoading(true)
            const { data } = await getLoggedUserData()
            setUserData(data.user)
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
    if (token) {
        getUserData()
    }
    }, [token])

    return (
        <userContext.Provider value={{userData , setUserData, isLoading}}>
            {children}
        </userContext.Provider>
    )
}
