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

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container sx={{ backgroundColor: 'background.paper'}} disableGutters>
        <Navbar />
        <Feed />
      </Container>
    </>
      
  )
}
