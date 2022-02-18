import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import RoundedButton from './RoundedButton'
import { auth, signInWithGoogle } from '../firebase-config';


function Login() {
  return (
    <Container disableGutters sx={{ height: '100vh', backgroundColor: 'background.paper', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ p: '15px' }}>
            <Box sx={{ p: '19px', display: 'flex', flexDirection: 'column' }}>
                <Typography component='span' fontWeight='bold' color='text.primary' variant='h3' sx={{ my: '38px', letterSpacing: '-0.8px', fontSize: '38px'}}>Happening now</Typography>
                <Typography component='span' fontWeight='bold' color='text.primary' variant='h6' sx={{ mb: '19px', letterSpacing: '-0.8px', fontSize: '22px'}}>Join today.</Typography>
                <RoundedButton text='Sign in with Google' variant='contained' action={signInWithGoogle} />
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: '38px' }}>
                    <Typography component='span' color='text.primary' fontWeight={700} sx={{ mb: '15px', lineHeight: '19px'}}>Already have an account?</Typography>
                    <RoundedButton text='Sign in' variant='outlined' />
                </Box>
            </Box>
        </Box>
    </Container>
  )
}

export default Login