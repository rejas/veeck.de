import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: 'auto',
    marginRight: theme.spacing(3),
  },
}));

const ListItemSC = (props) => {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon className={classes.icon}>
        <FiberManualRecordIcon color="primary" />
      </ListItemIcon>
      <ListItemText>{props.children}</ListItemText>
    </ListItem>
  );
};

ListItemSC.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default ListItemSC;
