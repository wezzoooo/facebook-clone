import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthContext'

export default function AuthProtectedRoutes({ children }) {
    const {token} = useContext(authContext)

    const navigate = useNavigate()

    useEffect(() => {
    if (token) {
        navigate("/")
    }
    }, [token])


    return (
        <>
            {children}
        </>
    )
}
