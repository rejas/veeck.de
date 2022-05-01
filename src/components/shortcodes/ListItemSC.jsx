import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';

const ListItemIconIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 'auto',
  marginRight: theme.spacing(3),
}));

const ListItemSC = (props) => {
  return (
    <ListItem>
      <ListItemIconIcon>
        <FiberManualRecordIcon color="primary" />
      </ListItemIconIcon>
      <ListItemText>{props.children}</ListItemText>
    </ListItem>
  );
};

ListItemSC.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]).isRequired,
};

export default ListItemSC;
