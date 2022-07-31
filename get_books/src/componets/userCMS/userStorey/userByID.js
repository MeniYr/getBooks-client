import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function UserByID() {
    const { idUser } = useParams()

    useEffect(() => {
        console.log(idUser)
    }, [])
    return (
        <div>UserByID</div>
    )
}
