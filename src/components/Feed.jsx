import { Box, Divider, Fab, Paper, Stack } from '@mui/material'
import React from 'react'
import FeedPost from './FeedPost'
import { posts } from '../../data'
import { Create } from '@mui/icons-material'

function Feed() {
  return (
  <>
    <Paper sx={{ mb: 7 }}>
      <Stack
          divider={<Divider flexItem />}
          >
          {posts.map(post => {
            return <FeedPost key={post.postId} post={post} />
          })}
      </Stack>
    </Paper>
    <Box sx={{ position: 'fixed', bottom: '76px', right: '20px', zIndex: 999 }}>
      <Fab color='primary' aria-label='create' sx={{ boxShadow: '0 0 5px white'}}>
        <Create  fontSize='large' />
      </Fab>
    </Box>
  </>
  )
}

export default Feed