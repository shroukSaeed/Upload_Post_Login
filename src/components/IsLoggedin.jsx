import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function IsLoggedin(props) {

    const isAuth = useSelector(state => state.authReducer.isAuth)
    const navigator = useNavigate()

    useEffect(() => {
        if (props.type == "isAuth" && !isAuth) {
            navigator('/login')
        } else if (props.type == "notIsAuth" && isAuth) {
            navigator('/')
        }
    }, [isAuth, navigator])

    return props.children


}