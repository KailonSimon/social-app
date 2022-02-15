import Head from 'next/head'
import Image from 'next/image'
import BottomNav from '../src/components/BottomNav'
import Feed from '../src/components/Feed'
import Navbar from '../src/components/Navbar'
import NavDrawer from '../src/components/NavDrawer'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Navbar />
      <Feed />
      <BottomNav />
    </>
      
  )
}
