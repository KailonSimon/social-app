import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import { Block, ChatBubble, ChatBubbleOutline, Favorite, FavoriteBorder, Flag, FlagOutlined, Loop, MoreHoriz, PersonRemoveOutlined, SentimentDissatisfiedOutlined, VolumeOffOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Skeleton, SwipeableDrawer } from '@mui/material';

export default function Post(props) {

  const { displayName, username, text, date } = props.post;
  const [isFavorited, setIsFavorited] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loading = false;

  return (
    <>
    <Card sx={{ width: '100%', px: '16px', py: '12px' }} square elevation={0}>
      <CardHeader
        sx={{ p: 0, alignItems: 'flex-start' }}
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
            <MoreHoriz />
          </IconButton>
        }
        title={
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', columnGap: '4px'}}>
            <Typography variant="body1" component="span">{loading ? <Skeleton width={75}/> : displayName}</Typography>
            <Typography variant="body1" color="text.secondary" component="span">{loading ? <Skeleton width={100}/> : `@${username}`}</Typography>
            <Typography variant="body1" color="text.secondary" component="span">{!loading && '•'}</Typography>
            <Typography variant="body1" color="text.secondary" component="span">{loading ? <Skeleton width={30} /> : date}</Typography>
          </Box>
        }
      />
      <CardContent sx={{ paddingLeft: '64px', paddingY: '0'}}>
        <Typography variant="body1" sx={{ mt: '-24px'}} >
            {loading ? <Skeleton width={250} height={48} /> : text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: '0 0 0 64px', height: '32px', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <Box>
          {loading ? 
            <Skeleton width={25} height={20} /> :
            <>
              <IconButton aria-label="comments" sx={{ p: 0 }}>
                <ChatBubbleOutline fontSize='small' color="disabled" />
              </IconButton>
              <Typography variant='caption' color="text.secondary" sx={{ px: '8px'}}>
                2
              </Typography>
            </>
          }
        </Box>
        <Box>
          {loading ? 
            <Skeleton width={25} height={20} /> :
            <>
              <IconButton onClick={() => setIsReposted(!isReposted)} aria-label="repost" sx={{ p: 0 }}>
                <Loop fontSize='small' color={ isReposted ? 'primary' : 'disabled' }/>
              </IconButton>
              <Typography variant='caption' color="text.secondary" sx={{ px: '8px'}}>5</Typography>
            </>
          }
        </Box>
        <Box>
          {loading ? 
            <Skeleton width={25} height={20} /> :
            <>
              <IconButton onClick={() => setIsFavorited(!isFavorited)} aria-label="add to favorites" sx={{ p: 0 }}>
                {isFavorited ?
                  <Favorite fontSize='small' color='primary'/>
                :
                  <FavoriteBorder fontSize='small' color='disabled'/>
                }
              </IconButton>
              <Typography variant='caption' color="text.secondary" sx={{ px: '8px'}}>16</Typography>
            </>
          }
        </Box>
        <IconButton aria-label="share" sx={{ p: 0 }}>
          <ShareIcon fontSize='small'/>
        </IconButton>
      </CardActions>
    </Card>
    <SwipeableDrawer
        anchor='bottom'
        open={isMenuOpen}
        onClose={() => console.log('menu open')}
        onOpen={() => console.log('menu closed')}
      >
        <Box>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <SentimentDissatisfiedOutlined fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Not interested in this post" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <PersonRemoveOutlined fontSize='small' />
              </ListItemIcon>
              <ListItemText primary={`Unfollow @${username}`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <VolumeOffOutlined fontSize='small' />
              </ListItemIcon>
              <ListItemText primary={`Mute @${username}`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <Block fontSize='small' />
              </ListItemIcon>
              <ListItemText primary={`Block @${username}`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <FlagOutlined fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Report post" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Button 
              variant='outlined' 
              color='info' 
              sx={{ width: '100%', borderRadius: '300px' }} 
              onClick={() => setIsMenuOpen(false)}
            >
              Cancel
            </Button>
          </ListItem>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
