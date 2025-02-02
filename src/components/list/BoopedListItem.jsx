import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
import * as React from 'react';
import { animated } from 'react-spring';

import { useBoop } from '../../hooks/use-boop';
import CategoryIcon from '../icons/CategoryIcon';

const BoopedListItem = ({ post }) => {
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });

  return (
    <ListItemButton component={Link} to={post.fields.slug} onMouseEnter={trigger}>
      <ListItemIcon>
        <animated.span style={style}>
          <CategoryIcon category={post.frontmatter.subcategory} color="primary" />
        </animated.span>
      </ListItemIcon>
      <ListItemText primary={post.frontmatter.title} secondary={post.excerpt} />
    </ListItemButton>
  );
};

export default BoopedListItem;
