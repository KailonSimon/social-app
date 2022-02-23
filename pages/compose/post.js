import { useState } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { Avatar, Box, Button, Container, FormControl, IconButton, Input, Snackbar, Alert } from '@mui/material'
import { db } from '../../src/firebase-config'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { addDoc, collection } from 'firebase/firestore';
import dayjs from 'dayjs';

function ComposePost() {
  const { data: session } = useSession();
  const [postText, setPostText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Posted successfully!');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setSnackbarOpen(false);
  }
  const handleSnackbarOpen = (postSuccessful) => {
    if (postSuccessful) {
        setSnackbarMessage('Posted successfully!')
        setSnackbarSeverity('success')
    } else {
        setSnackbarMessage('Failed to post.')
        setSnackbarSeverity('error');
    };
    setSnackbarOpen(true);
    return;
  }

  const createPost = async () => {
    if (loading) return;

    setLoading(true);
    try {
        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            avatar: session.user.image,
            text: postText,
            userId: session.user.uid,
            timestamp: dayjs().toJSON()
        });
        setPostText('');
        handleSnackbarOpen(true);
    } catch (error) {
        console.error(error);
        handleSnackbarOpen(false);
    } finally {
        setLoading(false);
    }

    //const imageRef = ref(storage, `posts/${docRef.id}/image`)
  }
  return (
    <>
    <Container disableGutters>
        <Box sx={{ display: 'flex', alignItems: 'center', height: '56px', px: '16px', backgroundColor: 'background.paper' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <IconButton onClick={() => router.push('/')}>
                    <ArrowBack />
                </IconButton>
                <Button variant='contained' sx={{ minWidth: '32px', borderRadius: '999px', px: '16px', textTransform: 'none'}} disabled={postText ? false : true} onClick={createPost}>Post</Button>
            </Box>
        </Box>
        <Container sx={{ display: 'flex', height: 'calc(100vh - 53px)', backgroundColor: 'background.paper', pt: '4px' }}>
            <Box sx={{ mr: '12px', pt: '4px',  }}>
                <Avatar alt={session?.user?.username.toUpperCase()} src={session?.user?.image} sx={{ height: '48px', width: '48px' }} />
            </Box>
            <FormControl variant="standard" sx={{ pt: '12px',  }}>
                <Input placeholder="What's happening?" minRows={4} maxRows={4} multiline sx={{ fontSize: '20px' }} value={postText} onChange={e => setPostText(e.target.value)}/>
            </FormControl>
        </Container>
    </Container>
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
        </Alert>
    </Snackbar>
    </>
  )
}

export default ComposePost