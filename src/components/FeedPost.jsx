import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Block, ChatBubbleOutline, DeleteForeverOutlined, Favorite, FavoriteBorder, FlagOutlined, Loop, MoreHoriz, PersonRemoveOutlined, SentimentDissatisfiedOutlined, ShareOutlined, VolumeOffOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, SwipeableDrawer } from '@mui/material';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { onSnapshot, collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

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

  const { id, username, avatar, text, userId, timestamp } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [hasFavorited, setHasFavorited] = useState(false);
  const [reposts, setReposts] = useState([]);
  const [hasReposted, setHasReposted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const loading = false;

  useEffect(
    () => 
      onSnapshot(collection(db, "posts", id, "favorites"), (snapshot) => 
        setFavorites(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () => 
      onSnapshot(collection(db, "posts", id, "reposts"), (snapshot) => 
        setReposts(snapshot.docs)
      ),
    [id]
  );

  useEffect(() => {
    setHasFavorited(favorites.findIndex((favorite) => (favorite.id === session?.user?.uid)) !== -1);
  }, [session?.user?.uid, favorites])

  useEffect(() => {
    setHasReposted(reposts.findIndex((repost) => (repost.id === session?.user?.uid)) !== -1);
  }, [session?.user?.uid, reposts])

  const favoritePost = async () => {
    if (hasFavorited) {
      await deleteDoc(doc(db, "posts", id, "favorites", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "favorites", session.user.uid), {
        username: session.user.username
      });
    }
  }
  const repostPost = async () => {
    if (hasReposted) {
      await deleteDoc(doc(db, "posts", id, "reposts", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "reposts", session.user.uid), {
        username: session.user.username
      });
    }
  }

  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", id));
};

  const handleUserClick = () => {
    router.push({ pathname: '/user/[uid]', query: { uid: userId }});
  }
  return (
    <>
    <Card sx={{ width: '100%', px: '16px', py: '12px' }} square elevation={0}>
      <CardHeader
        sx={{ p: 0, alignItems: 'flex-start', mb: '-24px' }}
        avatar={
          loading ? 
            <Skeleton variant="circular">
              <Avatar sx={{ width: '48px', height: '48px', border: '2px solid #ed1c24'}} />
            </Skeleton>
          :
            <Avatar alt={username[0].toUpperCase()} src={avatar} sx={{ width: '48px', height: '48px', cursor: 'pointer' }} onClick={handleUserClick} />
        }
        action={
          <IconButton aria-label="settings" sx={{ mt: '-8px' }} onClick={() => setIsMenuOpen(true)}>
            <MoreHoriz sx={{ color: 'neutral.main' }} />
          </IconButton>
        }
        title={
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', columnGap: '4px', cursor: 'pointer'}} onClick={handleUserClick}>
            <Typography variant="postH1" component="span" sx={{ textOverflow: 'ellipsis' }}>{loading ? <Skeleton width={75}/> : username}</Typography>
            <Typography variant="postH2" component="span" sx={{ textOverflow: 'ellipsis' }}>{loading ? <Skeleton width={100}/> : `@${username}`}</Typography>
            <Typography variant="postH2" component="span">{!loading && '·'}</Typography>
            <Typography variant="postH2" component="span" sx={{ textOverflow: 'ellipsis', overflowWrap: 'break-word' }}>{dayjs(timestamp).fromNow()}</Typography>
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
                {''}
              </Typography>
            </>
          }
        </Box>
        <Box>
          {loading ? 
            <Skeleton width={25} height={20} /> :
            <>
              <IconButton onClick={repostPost} aria-label="repost" sx={{ p: 0 }}>
                <Loop fontSize='small' color={ hasReposted ? 'primary' : 'disabled' }/>
              </IconButton>
              <Typography variant='postH2' sx={{ px: '8px'}}>{reposts.length > 0 && reposts.length}</Typography>
            </>
          }
        </Box>
        <Box>
          {loading ? 
            <Skeleton width={25} height={20} /> :
            <>
              <IconButton onClick={favoritePost} aria-label="add-to-favorites" sx={{ p: 0 }}>
                {hasFavorited ?
                  <Favorite fontSize='small' color='primary'/>
                :
                  <FavoriteBorder fontSize='small' color='disabled'/>
                }
              </IconButton>
              <Typography variant='postH2' sx={{ px: '8px'}}>{favorites.length > 0 && favorites.length}</Typography>
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
          {session?.user?.uid == userId &&
          <ListItem sx={{ p: 0 }} >
            <ListItemButton onClick={() => deletePost(id)} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <DeleteForeverOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary="Delete post" />
            </ListItemButton>
          </ListItem>
          }
          {session?.user?.uid != userId &&
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

