import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby-theme-material-ui';
import { animated } from 'react-spring';
import CategoryIcon from '../CategoryIcon';
import { useBoop } from '../../hooks/use-boop';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(4),
    cursor: 'pointer',
  },
  icon: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  link: {
    textTransform: 'uppercase',
    padding: theme.spacing(1),
    flexShrink: 0,

    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const MenuItem = (props) => {
  const classes = useStyles();
  const { link } = props;
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });
  style.display = 'flex';

  return (
    <Typography
      onMouseEnter={trigger}
      variant="h5"
      key={link.name}
      className={classes.root}
    >
      <animated.span style={style}>
        <CategoryIcon
          category={link.icon}
          color="primary"
          className={classes.icon}
        />
      </animated.span>
      <Link className={classes.link} color="inherit" noWrap to={link.url}>
        {link.name}
      </Link>
    </Typography>
  );
};

MenuItem.defaultProps = {};

MenuItem.propTypes = {
  link: PropTypes.object.isRequired,
};

export default MenuItem;
