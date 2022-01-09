import { styled } from '@mui/material/styles';
import { Link } from 'gatsby-theme-material-ui';
import { Button } from 'gatsby-theme-material-ui';
import PropTypes from 'prop-types';
import * as React from 'react';
import { animated } from 'react-spring';
import useSound from 'use-sound';

import { useBoop } from '../../hooks/use-boop';
import boopSfx from '../../sounds/tock.mp3';
import CategoryIcon from '../icons/CategoryIcon';

const Headline5Styled = styled(Button)(({ theme }) => ({
  margin: '0 auto 1rem',

  [theme.breakpoints.up('md')]: {
    padding: '0.25rem 3rem',
    width: '100%',
  },
}));

const CategoryIconStyled = styled(CategoryIcon)(({ theme }) => ({}));

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
    <Headline5Styled
      onMouseEnter={trigger}
      key={link.name}
      color="secondary"
      variant="contained"
    >
      <animated.span style={style}>
        <CategoryIconStyled category={link.icon} color="primary" />
      </animated.span>
      <LinkStyled onClick={play} color="inherit" to={link.url}>
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
