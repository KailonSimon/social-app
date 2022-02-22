import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { SwipeableDrawer, List, ListSubheader, ListItem, ListItemButton, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { Close, FavoriteBorder, Logout, PermIdentity, SettingsOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const pages = ['Products', 'Pricing', 'Blog'];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(!isDrawerOpen);
  };


  const drawer = (
    <Box
      sx={{ minWidth: 280, height: '100%', fontSize: '15px', backgroundColor: 'background.paper' }}
      role="presentation"
      onClick={(event) => toggleDrawer(event)}
      onKeyDown={(event) => toggleDrawer(event)}
    >
      <List 
        subheader={
          <ListSubheader sx={{ mt: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='body1' color="text.primary" fontWeight='bold'>Account info</Typography>
              <IconButton sx={{ p: 0 }} onClick={() => setIsDrawerOpen(false)} disableRipple disableFocusRipple disableTouchRipple>
                  <Close />
              </IconButton>
            </Box>
            <Box sx={{ pt: '12px' }}>
              <Avatar alt="k" src={session?.user?.image} />
            </Box>
            <Box sx={{ py: '12px' }}>
              <Typography variant='body1' color="text.primary" fontWeight='bold'>{session?.user?.name}</Typography>
              <Typography variant='body1' color="text.secondary">@{session?.user?.username}</Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', columnGap: '24px', py: '12px'}}>
              <Box sx={{ display: 'flex', columnGap: '4px'}}>
                <Typography variant='body1' color="text.primary" fontWeight='bold'>0</Typography>
                <Typography variant='body1' color="text.secondary">Following</Typography>
              </Box>
              <Box sx={{ display: 'flex', columnGap: '4px' }}>
                <Typography variant='body1' color="text.primary" fontWeight='bold'>0</Typography>
                <Typography variant='body1' color="text.secondary">Followers</Typography>
              </Box>
            </Box>
          </ListSubheader>
        } disablePadding
      >

        <ListItem sx={{ p: 0 }}>
          <ListItemButton sx={{ minHeight: '52px' }}>
            <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
              <PermIdentity fontSize='small' />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem sx={{ p: 0 }}>
          <ListItemButton sx={{ minHeight: '52px' }}>
            <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
              <FavoriteBorder fontSize='small' />
            </ListItemIcon>
            <ListItemText primary="Likes" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton sx={{ minHeight: '52px' }}>
            <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
              <SettingsOutlined fontSize='small' />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem sx={{ p: 0 }}>
          <Link href='/logout' passHref>
            <ListItemButton sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <Logout fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ height: '53px' }}>
        <Container maxWidth="xl" sx={{ paddingLeft: '16px', backgroundColor: 'background.paper' }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Home
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={toggleDrawer} sx={{ p: 0, mr: '24px' }}>
                <Avatar alt="k" src={session?.user?.image} sx={{ width: '32px', height: '32px' }}/>
              </IconButton>
            </Box>
            <Typography
              variant="headerH1"
              noWrap
              component="div"
              sx={{ flexGrow: 0, fontWeight: 'bold', display: { xs: 'flex', md: 'none' } }}
            >
              Latest Posts
            </Typography>

          </Toolbar>
        </Container>
      </AppBar>
      <SwipeableDrawer
        anchor='left'
        open={isDrawerOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {drawer}
      </SwipeableDrawer>
    </>
  );
};
export default Navbar;
