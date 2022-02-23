import { Button, Container, Typography } from "@mui/material"
import { useRouter } from "next/router"

function NotSignedIn() {
  const router = useRouter();

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'background.paper', height: '100vh'}} disableGutters>
        <Typography variant='postH1' sx={{ color: 'white', mb: '12px' }}>You must be signed in to view this page</Typography>
        <Button onClick={() => router.push('/')} variant='outlined' sx={{ px: '16px', height: '36px', textTransform: 'none', borderRadius: '999px', border: '1px solid white', fontWeight: 'bold', color: 'black', backgroundColor: 'white', '&:hover': { backgroundColor: 'white', border: '1px solid white' } }}>
            <Typography variant='postH1' component='span'>Go to sign in</Typography>
        </Button>
    </Container>
  )
}

export default NotSignedIn