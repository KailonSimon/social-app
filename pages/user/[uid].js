import { useEffect, useState } from "react"
import { Container, Box, IconButton, Avatar, Button, Typography, Tabs, Tab, Divider, Dialog, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, SwipeableDrawer } from "@mui/material"
import { PersonRemoveOutlined, SentimentDissatisfiedOutlined, ShareOutlined, VolumeOffOutlined, Block, FlagOutlined, ArrowBack, CakeOutlined, CelebrationOutlined, LinkOutlined, LocationOnOutlined, MailOutlined, MoreHoriz, StarBorder, Group, PersonOffOutlined, DeleteForeverOutlined } from "@mui/icons-material"
import PropTypes from 'prop-types';
import Feed from "../../src/components/Feed";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../src/firebase-config";
import Loading from "../../src/components/Loading";
import NotSignedIn from "../../src/components/NotSignedIn";
import dayjs from "dayjs"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Profile() {
  const [following, setFollowing] = useState(false);
  const [followsUser, setFollowsUser] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    if (session) {
      const unsubscribe = onSnapshot(doc(db, 'users', uid), (doc) => 
        setUser(doc.data())
      )
      return () => unsubscribe();
    }
  }, [session, uid])

  useEffect(() => {
    if (user) {
      setFollowing(user.followers.findIndex((user) => (user === session?.user?.uid)) !== -1);
      setFollowsUser(user.following.findIndex((user) => (user === session?.user?.uid)) !== -1);
    }
  }, [user, uid])

  const followUser = async () => {
    if (following) {
      await updateDoc(doc(db, 'users', session.user.uid), {
        following: arrayRemove(uid)
      })
      await updateDoc(doc(db, 'users', uid), {
        followers: arrayRemove(session.user.uid)
      })
    } else {
      await updateDoc(doc(db, 'users', session.user.uid), {
        following: arrayUnion(uid)
      })
      await updateDoc(doc(db, 'users', uid), {
        followers: arrayUnion(session.user.uid)
      })
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (status === "loading") {
    return (
      <Loading />
    )
  } else if (status === "unauthenticated") {
    return <NotSignedIn />
  } else {
    return (
    <>
    <Container sx={{ backgroundColor: 'background.paper', height: '100vh'}} disableGutters>
        <Box sx={{ display: 'flex', alignItems: 'center', height: '56px', px: '16px', backgroundColor: 'background.paper' }}>
            <Box sx={{ width: '56px', display: 'flex' }}>
                <IconButton onClick={() => router.push('/')}>
                    <ArrowBack />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    variant="posth1"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 0, fontWeight: 'bold', display: 'flex', color: 'white' }}
                    >
                  {user?.name}
                </Typography>
                <Typography
                    variant="posth2"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 0, display: 'flex', color: 'neutral.main' }}
                    >
                    0 posts
                </Typography>
            </Box>
        </Box>
        <Box sx={{ height: '130px', width: '100%', border: '1px solid white' }} >
            image
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: '16px', pt: '12px', px: '16px' }}>
            {/*avatar and icon buttons*/}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '48px' }}>
                <Avatar src={user?.avatar} alt={user?.name[0].toUpperCase()} sx={{ height: '85px', width: '85px', position: 'relative', bottom: '0px', border: '1px solid black' }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: '8px' }}>
                  {session.user.uid == uid ? 
                    <Button onClick={() => console.log('Edit profile clicked')} variant='outlined' sx={{ px: '16px', mb: '12px', height: '36px', textTransform: 'none', borderRadius: '999px', border: '1px solid #536471', fontWeight: 'bold', color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'black', border: '1px solid #536471' } }}>
                      <Typography variant='postH1' component='span'>Edit profile</Typography>
                    </Button>
                  :
                    <>
                    <IconButton sx={{ height: '34px', width: '36px', mb: '12px', border: '1px solid #536471'}} onClick={() => setIsMenuOpen(true)}>
                        <MoreHoriz />
                    </IconButton>
                    <IconButton sx={{ height: '34px', width: '36px', mb: '12px', border: '1px solid #536471'}}>
                        <MailOutlined />
                    </IconButton>
                    {following &&
                      <IconButton sx={{ height: '34px', width: '36px', mb: '12px', border: '1px solid #536471'}}>
                      <StarBorder />
                      </IconButton>
                    }
                    {following ?
                      <Button onClick={followUser} variant='outlined' sx={{ px: '16px', height: '36px', textTransform: 'none', borderRadius: '999px', border: '1px solid #536471', fontWeight: 'bold', color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'black', border: '1px solid #536471' } }}>
                        <Typography variant='postH1' component='span'>Following</Typography>
                      </Button>
                      :
                      <Button onClick={followUser} variant='outlined' sx={{ px: '16px', height: '36px', textTransform: 'none', borderRadius: '999px', border: '1px solid #536471', fontWeight: 'bold', color: 'black', backgroundColor: 'white', '&:hover': { backgroundColor: 'white', border: '1px solid #536471' } }}>
                          <Typography variant='postH1' component='span'>Follow</Typography>
                      </Button>
                    }
                    </>
                  }
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: '12px', mt: '4px' }}>
                {/*display and user name*/}
                <Typography
                        variant="postH1"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 0, fontWeight: 'bold', display: 'flex', color: 'white' }}
                        >
                        {user?.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '4px'}}>
                        <Typography
                        variant="postH2"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 0, display: 'flex', color: 'neutral.main' }}
                        >
                            @{user?.username}
                        </Typography>
                        {followsUser && <Typography variant='postH2' sx={{ backgroundColor: 'rgb(32, 35, 39)', color: 'rgb(110, 118, 125)', px: '4px', borderRadius: '4px' }}>Follows you</Typography>}
                    </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: '12px', mt: '4px' }}>
                {/*user bio*/}
                <Typography
                    variant="postH1"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 0, fontWeight: '400', display: 'flex', color: 'white' }}
                    >
                    {user?.bio}
                </Typography>
            </Box>
            <Box sx={{ mb: '12px', mt: '4px' }}>
                {/*conditional info*/}
                {user?.location &&
                <Box sx={{ display: 'inline-block', mr: '12px' }}>
                    <LocationOnOutlined sx={{ color: 'neutral.main', mr: '4px', fontSize: 18, verticalAlign: 'bottom' }} />
                    <Typography
                        variant="postH2"
                        noWrap
                        sx={{ color: 'neutral.main' }}
                        >
                        {user?.location}
                    </Typography>
                </Box>
                }
                {user?.link &&
                <Box sx={{ display: 'inline-block', mr: '12px' }}>
                    <LinkOutlined sx={{ color: 'neutral.main', mr: '4px', fontSize: 18, verticalAlign: 'bottom' }} />
                    <Typography
                        variant="postH2"
                        noWrap
                        sx={{ color: 'neutral.main' }}
                        >
                        {user?.link}
                    </Typography>
                </Box>
                }
                {user?.birthday &&
                <Box sx={{ display: 'inline-block', mr: '12px', verticalAlign: 'bottom'}}>
                    <CakeOutlined sx={{ color: 'neutral.main', mr: '4px', fontSize: 18 }} />
                    <Typography
                        variant="postH2"
                        noWrap
                        sx={{ color: 'neutral.main' }}
                        >
                        Born {user?.birthday}
                    </Typography>
                </Box>
                }
                {user?.joined &&
                <Box sx={{ display: 'inline-block', mr: '12px' }}>
                    <CelebrationOutlined  sx={{ color: 'neutral.main', mr: '4px', fontSize: 18, verticalAlign: 'bottom' }} />
                    <Typography
                        variant="postH2"
                        noWrap
                        sx={{ color: 'neutral.main' }}
                        >
                        Joined {dayjs(user?.joined).format('MMMM YYYY')}
                    </Typography>
                </Box>
                }
            </Box>
            <Box sx={{ display: 'flex', width: '100%', columnGap: '24px'}}>
              <Box sx={{ display: 'flex', columnGap: '4px'}}>
                <Typography variant='postH1' color="text.primary" fontWeight='bold'>{user?.following.length}</Typography>
                <Typography variant='postH2' sx={{ color: 'neutral.main' }}>Following</Typography>
              </Box>
              <Box sx={{ display: 'flex', columnGap: '4px' }}>
                <Typography variant='postH1' color="text.primary" fontWeight='bold'>{user?.followers.length}</Typography>
                <Typography variant='postH2' sx={{ color: 'neutral.main' }}>Followers</Typography>
              </Box>
            </Box>
        </Box>
        <Box>
            <Box>
                <Tabs 
                    variant='fullWidth'
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{ color: '#fff'}}
                    >
                    <Tab label='Posts' />
                    <Tab label='Reposts' />
                    <Tab label='Favorites' />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
                <Divider />
                <Feed />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Divider />
                <Feed />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <Divider />
                <Feed />
            </TabPanel>
        </Box>
    </Container>
        <SwipeableDrawer
        anchor='bottom'
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpen={() => setIsMenuOpen(true)}
        PaperProps={{ style: { borderTopLeftRadius: '32px', borderTopRightRadius: '32px' }}}
        BackdropProps={{ style: { backgroundColor: 'rgba(91, 112, 131, 0.4)' }}}
        >
        <Box sx={{ backgroundColor: 'black' }}>
          {session?.user?.uid == uid &&
          <ListItem sx={{ p: 0 }} >
            <ListItemButton onClick={() => deletePost(id)} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <DeleteForeverOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary="Delete post" />
            </ListItemButton>
          </ListItem>
          }
          {session?.user?.uid != uid &&
          <>
          <ListItem sx={{ p: 0 }} >
            <ListItemButton onClick={() => setIsMenuOpen(false)} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <Group fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary={`Add/remove @${user?.username} from Groups`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={() => { followUser(); setIsMenuOpen(false) }} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <PersonRemoveOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary={`${following ? `Unfollow` : `Follow`} @${user?.username}`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={() => setIsMenuOpen(false)} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <VolumeOffOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary={`Mute @${user?.username}`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={() => {setIsMenuOpen(false); setFollowsUser(!followsUser)}} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <PersonOffOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary={`Remove this follower`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={() => {setIsDialogOpen(true); setIsMenuOpen(false)}} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <Block fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary={`Block @${user?.username}`} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={() => setIsMenuOpen(false)} sx={{ minHeight: '52px' }}>
              <ListItemIcon sx={{ minWidth: 0, mr: '12px' }}>
                <FlagOutlined fontSize='small' sx={{ color: 'neutral.main' }} />
              </ListItemIcon>
              <ListItemText primary={`Report @${user?.username}`} />
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
            <Typography variant='h6' color='text.primary' fontWeight='bold'>Block @{user?.username}?</Typography>
            <Typography variant='body1' color='text.secondary'>They will not be able to follow you or view your posts, and you will not see posts or notifications from @{user?.username}.</Typography>
            <Box sx={{ mt: '24px' }}>
                <Button onClick={() => setIsDialogOpen(false)} variant='contained' sx={{ minHeight: '44px', mb: '12px', backgroundColor: 'red', color: 'white', textTransform: 'none', borderRadius: '999px', fontWeight: 'bold'}} fullWidth>Block</Button>
                <Button onClick={() => setIsDialogOpen(false)} variant='outlined' sx={{ minHeight: '44px', textTransform: 'none', borderRadius: '999px', fontWeight: 'bold', color: 'white', border: '1px solid #536471'}} fullWidth>Cancel</Button>
            </Box>
        </Box>
      </Dialog>
      </>
    )
  }
}

export default Profile