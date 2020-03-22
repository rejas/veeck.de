import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CategoryIcon from '../icons/CategoryIcon';

const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: 'auto',
    marginRight: theme.spacing(3),
  },
}));

const ListItemElement = (props) => {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon className={classes.icon}>
        <CategoryIcon color="primary" />
      </ListItemIcon>
      <ListItemText>{props.children}</ListItemText>
    </ListItem>
  );
};

ListItemElement.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default ListItemElement;
