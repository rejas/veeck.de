import * as React from 'react';
import PropTypes from 'prop-types';
import useSound from 'use-sound';
import { Link } from 'gatsby-theme-material-ui';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { animated } from 'react-spring';
import CategoryIcon from '../CategoryIcon';
import { useBoop } from '../../hooks/use-boop';
import boopSfx from '../../sounds/tock.mp3';

const Headline5Styled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(4),
  cursor: 'pointer',
}));

const CategoryIconStyled = styled(CategoryIcon)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textTransform: 'uppercase',
  margin: 0,
  padding: `${theme.spacing(0.5)} 0 0 ${theme.spacing(1)}`,
  flexShrink: 0,

  '&:hover': {
    textDecoration: 'none',
  },
}));

const MenuItem = (props) => {
  const { link } = props;
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });
  style.display = 'flex';
  const [play] = useSound(boopSfx);

  return (
    <Headline5Styled onMouseEnter={trigger} variant="h5" key={link.name}>
      <animated.span style={style}>
        <CategoryIconStyled category={link.icon} color="primary" />
      </animated.span>
      <LinkStyled onClick={play} color="inherit" noWrap to={link.url}>
        {link.name}
      </LinkStyled>
    </Headline5Styled>
  );
};

MenuItem.defaultProps = {};

MenuItem.propTypes = {
  link: PropTypes.object.isRequired,
};

export default MenuItem;
