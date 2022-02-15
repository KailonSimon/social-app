import { useState } from 'react'
import { Paper, BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import { Home, Mail, Notifications, Search } from '@mui/icons-material';
import { NextLinkComposed } from './Link';

export default function BottomNav() {
    const [value, setValue] = useState(0);
  
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
                sx={{ borderTop: '1px solid #424242' }}
            >
                <BottomNavigationAction 
                    component={NextLinkComposed} 
                    to={{
                        pathname: '/',
                        query: { name: 'test' },
                    }}
                    label="My Feed" 
                    icon={
                        <Badge color='primary' variant='dot'>
                            <Home />
                        </Badge>
                    } 
                    showLabel={false} 
                />
                <BottomNavigationAction 
                    component={NextLinkComposed} 
                    to={{
                        pathname: '/search',
                        query: { name: 'test' },
                    }}
                    label="Search" 
                    icon={<Search />} 
                    showLabel={false} 
                />
                <BottomNavigationAction 
                    component={NextLinkComposed} 
                    to={{
                        pathname: '/notifications',
                        query: { name: 'test' },
                    }}
                    label="Notifications" 
                    icon={
                        <Badge badgeContent={5} max={99} color="primary">
                            <Notifications />
                        </Badge>
                    } 
                    showLabel={false} 
                />
                <BottomNavigationAction 
                    component={NextLinkComposed} 
                    to={{
                        pathname: '/messages',
                        query: { name: 'test' },
                    }}
                    label="Messages" 
                    icon={<Mail />} 
                    showLabel={false} 
                />
            </BottomNavigation>
        </Paper>
    );
}