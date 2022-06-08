import React, { useEffect } from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../config/firebase'
import {useDispatch} from 'react-redux'
import { login, logout } from '../features/auth'
import Navbar from './Navbar'
import { getAllPosts } from '../features/posts'

export default function Page({children}) {
    const dispatch = useDispatch()

    useEffect(()=>{
        onAuthStateChanged(auth,(authResult)=>{
            if(authResult){
                console.log(authResult)
                dispatch(login({
                    email:authResult.email,
                    name:authResult.displayName,
                    profilePic:authResult.photoURL,
                    provider:authResult.providerId,
                    idProvider:authResult.uid
                }))
                .then(()=>{
                    dispatch(getAllPosts())
                })
                
            }else{
                dispatch(logout())
            }
        })
    },[dispatch])
  return (
    <>
        <Navbar/>
        {children}
    </>
  )
}