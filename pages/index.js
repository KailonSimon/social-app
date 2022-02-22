import { useSession } from "next-auth/react"
import Head from 'next/head'
import Feed from '../src/components/Feed'
import Navbar from '../src/components/Navbar'
import { CircularProgress, Container } from '@mui/material'


export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'background.paper', height: '100vh'}} disableGutters>
        <CircularProgress />
      </Container>
    )
  }

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
