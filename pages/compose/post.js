import { useState } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { Avatar, Box, Button, Container, FormControl, IconButton, Input, Snackbar, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link'
import { db } from '../../src/firebase-config'
import { addDoc, collection } from 'firebase/firestore'


function ComposePost() {

  const [postText, setPostText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Posted successfully!');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const currentDate = new Date();

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
  async function createPost(e) {
    e.preventDefault();
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            displayName: "placeholder",
            username: "username12",
            favorites: 0,
            reposts: 0,
            replies: 0,
            text: postText,
            date: currentDate
        }) 
        setPostText('');
        console.log("Posted successfully");
        handleSnackbarOpen(true);
    } catch (error) {
        console.error(error);
        handleSnackbarOpen(false)
    }
  };
  return (
    <>
    <Container disableGutters>
        <Box sx={{ display: 'flex', alignItems: 'center', height: '53px', px: '16px', backgroundColor: 'background.paper' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Link href='/' passHref>
                    <IconButton size="small">
                        <ArrowBack fontSize='small'/>
                    </IconButton>
                </Link>
                <Button variant='contained' sx={{ minWidth: '32px', borderRadius: '999px', px: '16px', textTransform: 'none'}} disabled={postText ? false : true} onClick={createPost}>Post</Button>
            </Box>
        </Box>
        <Container sx={{ display: 'flex', height: 'calc(100vh - 53px)', backgroundColor: 'background.paper', pt: '4px' }}>
            <Box sx={{ mr: '12px', pt: '4px',  }}>
                <Avatar sx={{ height: '48px', width: '48px'}} />
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