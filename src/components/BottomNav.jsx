import { useState } from 'react'
import { Paper, BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import { Home, Mail, Notifications, Search } from '@mui/icons-material';
import Link from 'next/link';

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
                    component={Link} 
                    to={{
                        pathname: '/',
                        query: { name: 'test' },
                    }}
                    label="My Feed" 
                    icon={
                        <Badge color='primary' variant='dot'>
                            <Home sx={{ color: 'white' }} />
                        </Badge>
                    } 
                    showLabel={false} 
                />
                <BottomNavigationAction 
                    component={Link} 
                    to={{
                        pathname: '/search',
                        query: { name: 'test' },
                    }}
                    label="Search" 
                    icon={<Search sx={{ color: 'white' }} />} 
                    showLabel={false} 
                    passHref
                />
                <BottomNavigationAction 
                    component={Link}
                    to={{
                        pathname: '/notifications',
                        query: { name: 'test' },
                    }}
                    label="Notifications" 
                    icon={
                        <Badge  max={99} color="primary">
                            <Notifications sx={{ color: 'white' }} />
                        </Badge>
                    } 
                    showLabel={false} 
                    passHref

                />
                <BottomNavigationAction 
                    component={Link} 
                    to={{
                        pathname: '/messages',
                        query: { name: 'test' },
                    }}
                    label="Messages" 
                    icon={<Mail sx={{ color: 'white' }} />} 
                    showLabel={false}
                    passHref

                />
            </BottomNavigation>
        </Paper>
    );
}