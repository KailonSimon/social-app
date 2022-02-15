import { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ListItemButton } from '@mui/material';

export default function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  const menuItems = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <ListItemButton>Profile</ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton>Settings</ListItemButton>
      </List>
    </Box>
  );

  return (
    <div>
        <>
          <Button onClick={toggleDrawer}>Open</Button>
          <SwipeableDrawer
            anchor='left'
            open={isOpen}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
        </>
    </div>
  );
}
