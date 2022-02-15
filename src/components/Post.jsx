import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { ChatBubble, Loop, MoreHoriz } from '@mui/icons-material';
import { Box } from '@mui/system';

export default function Post(props) {

  const { displayName, username, text, date } = props.post;
  const [isFavorited, setIsFavorited] = useState(false)
  const [isReposted, setIsReposted] = useState(false)

  return (
    <Card sx={{ width: '100%', px: '16px', py: '12px' }} square elevation={0}>
      <CardHeader
        sx={{ p: 0, alignItems: 'flex-start' }}
        avatar={
          <Avatar sx={{ width: '48px', height: '48px' }}>
            {displayName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" sx={{ py: 0 }}>
            <MoreHoriz />
          </IconButton>
        }
        title={
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', columnGap: '4px'}}>
            <Typography variant="body1" component="span">{displayName}</Typography>
            <Typography variant="body1" color="text.secondary" component="span">@{username}</Typography>
            <Typography variant="body1" color="text.secondary" component="span">•</Typography>
            <Typography variant="body1" color="text.secondary" component="span">{date}</Typography>
          </Box>
        }
      />
      <CardContent sx={{ paddingLeft: '64px', paddingY: '0'}}>
        <Typography variant="body1" sx={{ mt: '-24px'}} >
            {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: '0 0 0 64px', height: '32px', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <Box>
          <IconButton aria-label="comments" sx={{ p: 0 }}>
            <ChatBubble fontSize='small'/>
          </IconButton>
          <Typography variant='caption' color="text.secondary" sx={{ px: '8px'}}>2</Typography>
        </Box>
        <Box>
          <IconButton onClick={() => setIsReposted(!isReposted)} aria-label="repost" sx={{ p: 0 }}>
            <Loop fontSize='small' color={ isReposted ? 'primary' : 'inherit' }/>
          </IconButton>
          <Typography variant='caption' color="text.secondary" sx={{ px: '8px'}}>5</Typography>
        </Box>
        <Box>
          <IconButton onClick={() => setIsFavorited(!isFavorited)} aria-label="add to favorites" sx={{ p: 0 }}>
            <FavoriteIcon fontSize='small' color={ isFavorited ? 'primary' : 'inherit' } />
          </IconButton>
          <Typography variant='caption' color="text.secondary" sx={{ px: '8px'}}>16</Typography>
        </Box>
        <IconButton aria-label="share" sx={{ p: 0 }}>
          <ShareIcon fontSize='small'/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
