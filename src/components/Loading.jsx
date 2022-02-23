import { CircularProgress, Container } from '@mui/material'

function Loading() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'background.paper', height: '100vh'}} disableGutters>
      <CircularProgress />
    </Container>
  )
}

export default Loading