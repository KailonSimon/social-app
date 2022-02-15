import { Divider, Paper, Stack } from '@mui/material'
import React from 'react'
import Post from './Post'
import { posts } from '../../data'

function Feed() {
  return (
    <Stack
        divider={<Divider flexItem />}
        sx={{ mb: 7 }}
    >
        {posts.map(post => {
            return <Post key={post.id} post={post} />
        })}
    </Stack>
  )
}

export default Feed