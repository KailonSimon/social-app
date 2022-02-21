import { Box, Divider, Fab, Paper, Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import FeedPost from './FeedPost'
import { Create } from '@mui/icons-material'
import { db } from '../firebase-config'
import { collection, onSnapshot, query } from 'firebase/firestore'
//import { posts } from '../../data';
import Link from 'next/link'
import { getFeedPosts } from '../functions'

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "posts"))
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => ({
              id: doc.id,
              userID: doc.data().userID,
              displayName: doc.data().displayName,
              username: doc.data().username,
              text: doc.data().text,
              favorites: doc.data().favorites,
              reposts: doc.data().reposts,
              replies: doc.data().replies,
              date: doc.data().date
      })))
    })
  }, []);

  return (
  <Paper sx={{ minHeight: 'calc(100vh - 56px)', backgroundColor: 'background.paper' }} square>
    {posts &&
      <Stack
          divider={<Divider flexItem />}
          >
          {posts.map(post => {
            return <FeedPost key={post.id} post={post} />
          })}
      </Stack>
    }
    <Box sx={{ position: 'absolute', bottom: '76px', right: '20px', zIndex: 999 }}>
      <Link href='/compose/post' passHref>
        <Fab color='primary' aria-label='create' sx={{ boxShadow: '0 0 5px white'}}>
          <Create  fontSize='large' />
        </Fab>
      </Link>
    </Box>
  </Paper>
  )
}

export default Feed