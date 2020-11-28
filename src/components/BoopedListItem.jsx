import * as React from 'react';
import CategoryIcon from './CategoryIcon';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'gatsby-theme-material-ui';
import { animated } from 'react-spring';
import useBoop from '../hooks/use-boop';

const BoopedListItem = (props) => {
  const post = props.post;
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });

  return (
    <ListItem
      button
      component={Link}
      to={post.fields.slug}
      onMouseEnter={trigger}
    >
      <ListItemIcon>
        <animated.span style={style}>
          <CategoryIcon
            category={post.frontmatter.subcategory}
            color="primary"
          />
        </animated.span>
      </ListItemIcon>
      <ListItemText primary={post.frontmatter.title} secondary={post.excerpt} />
    </ListItem>
  );
};

export default BoopedListItem;
