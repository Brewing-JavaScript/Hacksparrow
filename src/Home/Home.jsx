

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const userInsession = sessionStorage.getItem('access_token')
        const token = JSON.parse(userInsession)
        if (!token) {
            navigate('/auth')
        }
    }, [])
    return (
        <div>
            home

        </div>
    )
}

export default Home