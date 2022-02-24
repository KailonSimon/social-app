import { useSession } from "next-auth/react"
import Head from 'next/head'
import Feed from '../src/components/Feed'
import Navbar from '../src/components/Navbar'
import { Button, Container, Typography, Box } from '@mui/material'
import { useRouter } from "next/router"
import { getProviders, signIn as SignInWithProviders } from "next-auth/react"
import { Google } from "@mui/icons-material";
import { useEffect } from "react"
import { onSnapshot, doc, setDoc } from "firebase/firestore"
import { db } from "../src/firebase-config"
import Loading from "../src/components/Loading"
import dayjs from "dayjs"


export default function Home({ providers }) {
  const { data: session, status } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const unsubscribe = onSnapshot(doc(db, 'users', session.user.uid), (snapshot) => {
        if (!snapshot.data()) {
          saveUser(session);
        }
      })
      return () => unsubscribe();
    }
  }, [session])

  const saveUser = async (session) => {
    await setDoc(doc(db, 'users', session.user.uid), {
      username: session.user.username,
      name: session.user.name,
      avatar: session.user.image,
      email: session.user.email,
      bio: '',
      following: [],
      followers: [],
      joined: dayjs().toJSON(),
      birthday: '',
      link: '',
      location: ''
    })
  }
      
  if (status === "loading") {
    return (
      <Loading />
    )
  }
  else if (status === "unauthenticated") {
    return (
      <Container disableGutters sx={{ height: '100vh', backgroundColor: 'background.paper', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ p: '15px' }}>
            <Box sx={{ p: '19px', display: 'flex', flexDirection: 'column' }}>
                <Typography component='span' fontWeight='bold' color='text.primary' variant='h3' sx={{ my: '38px', letterSpacing: '-0.8px', fontSize: '38px'}}>Happening now</Typography>
                <Typography component='span' fontWeight='bold' color='text.primary' variant='h6' sx={{ mb: '19px', letterSpacing: '-0.8px', fontSize: '22px'}}>Join today.</Typography>
                {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <Button onClick={() => SignInWithProviders(provider.id, { callbackUrl: '/' })} variant='contained' sx={{ minHeight: '44px', mb: '12px', backgroundColor: 'white', color: 'black', textTransform: 'none', borderRadius: '999px', fontWeight: 'bold', '&:hover': { backgroundColor: '#fff'} }} endIcon={<Google />} fullWidth>
                    Sign in with {provider.name}
                    </Button>
                </div>
                ))}
            </Box>
        </Box>
      </Container>
    )
  }
  else if (status === "authenticated") {
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
}
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
      props: {
          providers
      }
  } 
}
