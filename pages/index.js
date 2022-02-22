import Head from 'next/head'
import Feed from '../src/components/Feed'
import Navbar from '../src/components/Navbar'
import { Container } from '@mui/material'


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
