import { Box, Button, Container, Modal, Typography } from "@mui/material";
import Link from "next/link";
import { firebaseLogout } from "../src/firebase-config";

export default function logout() {
  return (
    <Container>
        <Modal
            open={true}
            sx={{ backgroundColor: '#121212', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box sx={{ width: '320px', maxWidth: '80vw', p: '28px', backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column', borderRadius: '16px'}}>
                <Typography variant='h6' color='text.primary' fontWeight='bold'>Log out?</Typography>
                <Typography variant='body1' color='text.secondary'>You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.</Typography>
                <Box sx={{ mt: '24px' }}>
                    <Link href='/' passHref>
                        <Button variant='contained' sx={{ minHeight: '44px', mb: '12px', backgroundColor: 'white', color: 'black', textTransform: 'none', borderRadius: '999px', fontWeight: 'bold'}} onClick={firebaseLogout} fullWidth>Log out</Button>
                    </Link>
                    <Link href='/' passHref>
                        <Button variant='outlined' sx={{ minHeight: '44px', textTransform: 'none', borderRadius: '999px', fontWeight: 'bold', color: 'white', border: '1px solid #536471'}} fullWidth>Cancel</Button>
                    </Link>
                </Box>
            </Box>
        </Modal>
    </Container>
  )
}
