import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CategoryIcon from '../icons/CategoryIcon';

const useStyles = makeStyles(theme => ({
  icon: {
    minWidth: 'auto',
    marginRight: theme.spacing(3),
  },
}));

const ListItemElement = props => {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon className={classes.icon}>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText>{props.children}</ListItemText>
    </ListItem>
  );
};

export default ListItemElement;
