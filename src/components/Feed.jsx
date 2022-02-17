import { Box, Divider, Fab, Paper, Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import FeedPost from './FeedPost'
import { Create } from '@mui/icons-material'
import { db } from '../firebase-config'
import { collection, onSnapshot, query } from 'firebase/firestore'
//import { posts } from '../../data';
import Link from 'next/link'

function Feed() {
  const [posts, setPosts] = useState([])
  const postQuery = query(collection(db, "posts"));
  const getPosts = onSnapshot(postQuery, (snapshot) => {
    setPosts(snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        displayName: data.displayName,
        username: data.username,
        text: data.text,
        favorites: data.favorites,
        reposts: data.reposts,
        replies: data.replies,
        date: data.date,
      }
    }));
  });
  useEffect(() => {
    getPosts();
  }, [])

  return (
  <Paper sx={{ minHeight: 'calc(100vh - 56px)', backgroundColor: 'background.paper' }}>
    <Paper sx={{ mb: 7 }}>
      <Stack
          divider={<Divider flexItem />}
          >
          {posts.map(post => {
            return <FeedPost key={post.id} post={post} />
          })}
      </Stack>
    </Paper>
    <Box sx={{ position: 'fixed', bottom: '76px', right: '20px', zIndex: 999 }}>
      <Link href='/compose/post'>
        <Fab color='primary' aria-label='create' sx={{ boxShadow: '0 0 5px white'}}>
          <Create  fontSize='large' />
        </Fab>
      </Link>
    </Box>
  </Paper>
  )
}

export default Feed