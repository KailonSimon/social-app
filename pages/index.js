import { useState } from 'react'
import Head from 'next/head'
import BottomNav from '../src/components/BottomNav'
import Feed from '../src/components/Feed'
import Navbar from '../src/components/Navbar'
import NavDrawer from '../src/components/NavDrawer'
import styles from '../styles/Home.module.css'
import Login from '../src/components/Login'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {isAuthenticated ? 
      <>
      <Navbar />
      <Feed />
      <BottomNav />
      </>
      :
      <Login />
      } 
    </>
      
  )
}
