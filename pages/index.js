import { useState } from 'react'
import Head from 'next/head'
import BottomNav from '../src/components/BottomNav'
import Feed from '../src/components/Feed'
import Navbar from '../src/components/Navbar'
import Login from '../src/components/Login'
import { Container } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth } from '../src/firebase-config';
import { onAuthStateChanged } from '@firebase/auth';
import { saveUser } from '../src/features/redux/slice/authSlice';

export default function Home() {
  const user = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {user ? 
      <Container sx={{ backgroundColor: 'background.paper'}} disableGutters>
      <Navbar />
      <Feed />
      <BottomNav />
      </Container>
      :
      <Login />
      } 
    </>
      
  )
}
