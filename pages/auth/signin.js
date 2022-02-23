import { getProviders, signIn as SignInWithProviders } from "next-auth/react"
import { Container, Box, Typography, Button } from "@mui/material";
import { Google } from "@mui/icons-material";

//Client side
function signIn({ providers }) {
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

//Server side
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    } 
}

export default signIn
