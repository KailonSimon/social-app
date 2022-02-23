import { useEffect, useState } from 'react'
import { Box, CircularProgress, Divider, Fab, Paper, Skeleton, Stack, Typography } from '@mui/material'
import FeedPost from './FeedPost'
import { Create } from '@mui/icons-material'
import Link from 'next/link'
import { db } from '../firebase-config'
import { collection, onSnapshot, query, orderBy } from '@firebase/firestore'

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () => 
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
        setPosts(snapshot.docs);
      })
  , []);
  return (
  <Paper sx={{ minHeight: 'calc(100vh - 56px)', backgroundColor: 'background.paper' }} square>
    {posts &&
      <Stack
          divider={<Divider flexItem />}
          >
          {posts.length > 0 ?
            posts.map((post) => {
              return (
                <FeedPost 
                  key={post.id} 
                  id={post.id} 
                  userId={post.data().userId}
                  username={post.data().username}
                  text={post.data().text}
                  avatar={post.data().avatar}
                  timestamp={post.data().timestamp}
                />
              )
            })
          :
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', mt: '32px'}}>
              <CircularProgress color='primary' />
            </Box>
          }
      </Stack>
    }
    <Box sx={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 999 }}>
      <Link href='/compose/post' passHref>
        <Fab color='primary' aria-label='create'>
          <Create  fontSize='large' />
        </Fab>
      </Link>
    </Box>
  </Paper>
  )
}

export default Feed