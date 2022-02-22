import { useSession } from "next-auth/react"
import Head from 'next/head'
import Feed from '../src/components/Feed'
import Navbar from '../src/components/Navbar'
import { CircularProgress, Container } from '@mui/material'
import { useRouter } from "next/router"


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'background.paper', height: '100vh'}} disableGutters>
        <CircularProgress />
      </Container>
    )
  }
  if (status === "unauthenticated") {
    router.push('/auth/signin');
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
