import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { SwipeableDrawer, List, ListSubheader, ListItem, ListItemButton, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { Favorite, Logout, PermIdentity, Settings } from '@mui/icons-material';

const pages = ['Products', 'Pricing', 'Blog'];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      sx={{ minWidth: 280, fontSize: '15px' }}
      role="presentation"
      onClick={(event) => toggleDrawer(event)}
      onKeyDown={(event) => toggleDrawer(event)}
    >
      <List subheader={<ListSubheader>Account info</ListSubheader>} disablePadding>

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
              <Favorite fontSize='small' />
            </ListItemIcon>
            <ListItemText primary="Likes" />
          </ListItemButton>
        </ListItem>

      </List>
      <Divider />
      <List disablePadding>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton sx={{ minHeight: '52px' }}>
            <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
              <Settings fontSize='small' />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton sx={{ minHeight: '52px' }}>
            <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
              <Logout fontSize='small' />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ marginBottom: '16px'}}>
        <Container maxWidth="xl" sx={{ paddingLeft: '16px'}}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={toggleDrawer} sx={{ p: 0, mr: '24px' }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: '32px', height: '32px' }}/>
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Typography
              variant="body1"
              noWrap
              component="div"
              sx={{ flexGrow: 0, fontWeight: 'bold', display: { xs: 'flex', md: 'none' } }}
            >
              Home
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
