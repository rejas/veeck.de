import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import RedditIcon from '@mui/icons-material/Reddit';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Button,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
} from '@mui/material';
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import React from 'react';

const DropdownShareButton = () => {
  const handleShare = (e) => {
    e.preventDefault();

    const ahref = window.location.href;
    const encodedAhref = encodeURIComponent(ahref);
    let link;

    switch (e.currentTarget.id) {
      case 'facebook':
        link = `https://www.facebook.com/sharer/sharer.php?u=${ahref}`;
        open(link);
        break;

      case 'twitter':
        link = `https://twitter.com/intent/tweet?url=${encodedAhref}`;
        open(link);
        break;

      case 'reddit':
        link = `https://www.reddit.com/submit?url=${encodedAhref}`;
        open(link);
        break;

      case 'copy':
        navigator.clipboard.writeText(ahref);
        break;

      default:
        break;
    }
  };

  const open = (socialLink) => {
    window.open(socialLink, '_blank');
  };

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button color="inherit" {...bindToggle(popupState)}>
            <ShareIcon />
            Share Article
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <List dense={true}>
                    <ListItem button id="facebook" onClick={handleShare}>
                      <ListItemIcon>
                        <FacebookIcon />
                      </ListItemIcon>
                      <ListItemText primary="Facebook" />
                    </ListItem>
                    <ListItem button id="twitter" onClick={handleShare}>
                      <ListItemIcon>
                        <TwitterIcon />
                      </ListItemIcon>
                      <ListItemText primary="Twitter" />
                    </ListItem>
                    <ListItem button id="reddit" onClick={handleShare}>
                      <ListItemIcon>
                        <RedditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Reddit" />
                    </ListItem>
                    <ListItem button id="copy" onClick={handleShare}>
                      <ListItemIcon>
                        <LinkIcon />
                      </ListItemIcon>
                      <ListItemText primary="Copy Link" />
                    </ListItem>
                  </List>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
};

export default DropdownShareButton;
