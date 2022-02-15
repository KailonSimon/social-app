import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import { Block, ChatBubble, ChatBubbleOutline, Favorite, FavoriteBorder, Flag, FlagOutlined, Loop, MoreHoriz, PersonRemoveOutlined, SentimentDissatisfiedOutlined, ShareOutlined, VolumeOffOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Button, Dialog, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, Skeleton, SwipeableDrawer } from '@mui/material';

export default function Post(props) {

  const { displayName, username, text, date, favorites, reposts } = props.post;
  const [isFavorited, setIsFavorited] = useState(false);
  const [totalFavorites, setTotalFavorites] = useState(favorites);
  const [isReposted, setIsReposted] = useState(false);
  const [totalReposts, setTotalReposts] = useState(reposts);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const favoriteHandler = () => {
    setTotalFavorites(isFavorited ? totalFavorites - 1 : totalFavorites + 1);
    setIsFavorited(!isFavorited);
  }
  const repostHandler = () => {
    setTotalReposts(isReposted ? totalReposts - 1 : totalReposts + 1);
    setIsReposted(!isReposted);
  }
  const loading = false //for future use
  return (
    <Box sx={{ backgroundColor: 'background.paper', height: '100vh'}}>
    <Card sx={{ width: '100%', px: '16px', py: '12px' }} square elevation={0}>
      <CardHeader
        sx={{ p: 0, alignItems: 'flex-start', mb: '4px' }}
        avatar={
          loading ? 
            <Skeleton variant="circular">
              <Avatar sx={{ width: '48px', height: '48px' }} />
            </Skeleton>
          :
            <Avatar sx={{ width: '48px', height: '48px' }} >
              {displayName[0]}
            </Avatar>
        }
        action={
          <IconButton aria-label="settings" sx={{ mt: '-8px' }} onClick={() => setIsMenuOpen(true)}>
            <MoreHoriz sx={{ color: 'neutral.main' }} />
          </IconButton>
        }
        title={
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: '4px'}}>
            <Typography variant="body1" component="span" fontWeight='bold' sx={{ mb: '-8px' }}>{loading ? <Skeleton width={75}/> : displayName}</Typography>
            <Typography variant="body1" color="text.secondary" component="span">{loading ? <Skeleton width={100}/> : `@${username}`}</Typography>
          </Box>
        }
      />
      <CardContent sx={{ p: '0'}}>
        <Box sx={{ py: '8px'}}>
            <Typography variant="subtitle1" fontWeight='bold' >
                {loading ? <Skeleton width={250} height={48} /> : text}
            </Typography>
            <Typography variant="body2" color='text.secondary'>
                12:02 PM • Feb 15, 2022 
            </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '16px 4px' }}>
            <Box sx={{ display: 'flex', columnGap: '4px' }}>
                <Typography variant="body2" fontWeight='bold' color='text.primary'>
                    {totalReposts}
                </Typography>
                <Typography variant="body2" color='text.secondary'>
                    Reposts
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', columnGap: '4px' }}>
                <Typography variant="body2" fontWeight='bold' color='text.primary'>
                    135
                </Typography>
                <Typography variant="body2" color='text.secondary'>
                    Comments
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', columnGap: '4px' }}>
                <Typography variant="body2" fontWeight='bold' color='text.primary'>
                    {totalFavorites}
                </Typography>
                <Typography variant="body2" color='text.secondary'>
                    Favorites
                </Typography>
            </Box>
        </Box>
        <Divider />

      </CardContent>
      <CardActions disableSpacing sx={{ p: 0 }} >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', py: '4px', height: '48px' }}>
                <IconButton aria-label="comments">
                    <ChatBubbleOutline sx={{ color: 'neutral.main' }}/>
                </IconButton>
                <IconButton onClick={repostHandler} aria-label="repost">
                    {isReposted ? 
                        <Loop color='primary'/>
                    :
                        <Loop sx={{ color: 'neutral.main' }}/>
                    }
                </IconButton>
                <IconButton onClick={favoriteHandler} aria-label="add-to-favorites">
                    {isFavorited ?
                        <Favorite color='primary'/>
                    :
                        <FavoriteBorder sx={{ color: 'neutral.main'}}/>
                    }
                </IconButton>
                <IconButton aria-label="share">
                    <ShareOutlined sx={{ color: 'neutral.main' }}/>
                </IconButton>
            </Box>
            <Divider />
        </Box>
      </CardActions>
    </Card>
    <SwipeableDrawer
        anchor='bottom'
        open={isMenuOpen}
        onClose={() => console.log('menu open')}
        onOpen={() => console.log('menu closed')}
      >
        <Box sx={{ backgroundColor: 'black' }}>
          <ListItem sx={{ p: 0 }} >
            <ListItemButton sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <SentimentDissatisfiedOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary="Not interested in this post" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <PersonRemoveOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary={`Unfollow @${username}`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <VolumeOffOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary={`Mute @${username}`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={() => {setIsDialogOpen(true); setIsMenuOpen(false)}} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <Block fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary={`Block @${username}`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <FlagOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary="Report post" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Button 
              variant='outlined'
              sx={{ width: '100%', borderRadius: '999px', color: 'white', border: '1px solid #536471', textTransform: 'none', fontWeight: 'bold', minHeight: '44px' }} 
              onClick={() => setIsMenuOpen(false)}
            >
              Cancel
            </Button>
          </ListItem>
        </Box>
      </SwipeableDrawer>
      <Dialog
        open={isDialogOpen}
        PaperProps={{ style: { borderRadius: '16px' }}}
      >
        <Box sx={{ width: '320px', maxWidth: '80vw', p: '28px', backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column'}}>
            <Typography variant='h6' color='text.primary' fontWeight='bold'>Block @{username}?</Typography>
            <Typography variant='body1' color='text.secondary'>They will not be able to follow you or view your posts, and you will not see posts or notifications from @{username}.</Typography>
            <Box sx={{ mt: '24px' }}>
                <Button onClick={() => setIsDialogOpen(false)} variant='contained' sx={{ minHeight: '44px', mb: '12px', backgroundColor: 'red', color: 'white', textTransform: 'none', borderRadius: '999px', fontWeight: 'bold'}} fullWidth>Block</Button>
                <Button onClick={() => setIsDialogOpen(false)} variant='outlined' sx={{ minHeight: '44px', textTransform: 'none', borderRadius: '999px', fontWeight: 'bold', color: 'white', border: '1px solid #536471'}} fullWidth>Cancel</Button>
            </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
