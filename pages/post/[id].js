import { ArrowBack } from '@mui/icons-material'
import { Box, Container, IconButton, Typography } from '@mui/material'
import React from 'react'
import BottomNav from '../../src/components/BottomNav'
import Link from 'next/link'

function Details() {
  return (
    <Container disableGutters>
        <Box sx={{ display: 'flex', alignItems: 'center', height: '53px', px: '16px', backgroundColor: 'background.paper' }}>
            <Box sx={{ mr: '36px'}}>
                <Link href='/' passHref>
                    <IconButton size="small">
                        <ArrowBack fontSize='small'/>
                    </IconButton>
                </Link>
            </Box>
            <Typography variant='subtitle1' fontWeight='bold' color='text.primary' sx={{ pt: '4px' }}>Post</Typography>
        </Box>
        <BottomNav />
    </Container>
  )
}

export default Details