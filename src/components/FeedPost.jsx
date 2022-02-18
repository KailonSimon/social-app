import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Block, ChatBubbleOutline, DeleteForeverOutlined, Favorite, FavoriteBorder, FlagOutlined, Loop, MoreHoriz, PersonRemoveOutlined, SentimentDissatisfiedOutlined, ShareOutlined, VolumeOffOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Button, Dialog, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, SwipeableDrawer } from '@mui/material';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deletePost } from '../functions';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
const updateLocale = require('dayjs/plugin/updateLocale')
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: '%ds',
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy"
  }
})


export default function FeedPost(props) {

  const { id, displayName, username, text, date, favorites, reposts, replies, userID } = props.post;
  const [user, loading, error] = useAuthState(auth);
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
  const timeElapsed = dayjs(date).fromNow();
  return (
    <>
    <Card sx={{ width: '100%', px: '16px', py: '12px' }} square elevation={0}>
      <CardHeader
        sx={{ p: 0, alignItems: 'flex-start', mb: '-24px' }}
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', columnGap: '4px' }}>
            <Typography variant="postH1" component="span" sx={{ textOverflow: 'ellipsis' }}>{loading ? <Skeleton width={75}/> : displayName}</Typography>
            <Typography variant="postH2" component="span" sx={{ textOverflow: 'ellipsis' }}>{loading ? <Skeleton width={100}/> : `@${username}`}</Typography>
            <Typography variant="postH2" component="span">{!loading && '·'}</Typography>
            <Typography variant="postH2" component="span" sx={{ textOverflow: 'ellipsis', overflowWrap: 'break-word' }}>{timeElapsed}</Typography>
          </Box>
        }
      />
      <CardContent sx={{ paddingLeft: '64px', paddingY: '0'}}>
        <Typography variant="postText" >
            {loading ? <Skeleton width={250} height={48} /> : text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: '0 0 0 64px', height: '32px', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <Box>
          {loading ? 
            <Skeleton width={25} height={20} /> :
            <>
              <IconButton aria-label="replies" sx={{ p: 0 }}>
                <ChatBubbleOutline fontSize='small' color="disabled" />
              </IconButton>
              <Typography variant='postH2' sx={{ px: '8px'}}>
                {replies}
              </Typography>
            </>
          }
        </Box>
        <Box>
          {loading ? 
            <Skeleton width={25} height={20} /> :
            <>
              <IconButton onClick={repostHandler} aria-label="repost" sx={{ p: 0 }}>
                <Loop fontSize='small' color={ isReposted ? 'primary' : 'disabled' }/>
              </IconButton>
              <Typography variant='postH2' sx={{ px: '8px'}}>{totalReposts}</Typography>
            </>
          }
        </Box>
        <Box>
          {loading ? 
            <Skeleton width={25} height={20} /> :
            <>
              <IconButton onClick={favoriteHandler} aria-label="add-to-favorites" sx={{ p: 0 }}>
                {isFavorited ?
                  <Favorite fontSize='small' color='primary'/>
                :
                  <FavoriteBorder fontSize='small' color='disabled'/>
                }
              </IconButton>
              <Typography variant='postH2' sx={{ px: '8px'}}>{totalFavorites}</Typography>
            </>
          }
        </Box>
        <IconButton aria-label="share" sx={{ p: 0 }}>
          <ShareOutlined fontSize='small' sx={{ color: 'neutral.main' }}/>
        </IconButton>
      </CardActions>
    </Card>
    <SwipeableDrawer
        anchor='bottom'
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpen={() => setIsMenuOpen(true)}
        PaperProps={{ style: { borderTopLeftRadius: '32px', borderTopRightRadius: '32px' }}}
        BackdropProps={{ style: { backgroundColor: 'rgba(91, 112, 131, 0.4)' }}}
      >
        <Box sx={{ backgroundColor: 'black' }}>
          {userID == user.uid &&
          <ListItem sx={{ p: 0 }} >
            <ListItemButton onClick={() => deletePost(id)} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <DeleteForeverOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary="Delete post" />
            </ListItemButton>
          </ListItem>
          }
          {userID != user.uid &&
          <>
          <ListItem sx={{ p: 0 }} >
            <ListItemButton onClick={() => setIsMenuOpen(false)} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <SentimentDissatisfiedOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary="Not interested in this post" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={() => setIsMenuOpen(false)} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <PersonRemoveOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary={`Unfollow @${username}`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={() => setIsMenuOpen(false)} sx={{ minHeight: '52px' }}>
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
            <ListItemButton onClick={() => setIsMenuOpen(false)} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <FlagOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary="Report post" />
            </ListItemButton>
          </ListItem>
          </>
          }
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
    </>
  );
}
