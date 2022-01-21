import { styled } from '@mui/material/styles';
import * as React from 'react';
import { animated, useSpring } from 'react-spring';

import { darkModeContext } from './ThemeHandler';

const IconStyled = styled('div')(({ theme }) => ({
  ...theme.mixins.glas,
  border: '1px solid ' + theme.palette.primary.main,
  borderRadius: '4px',
  width: '36px',
  height: '36px',
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'center',
  color: theme.palette.primary.main,
}));

/**
 * https://jfelix.info/blog/using-react-spring-to-animate-svg-icons-dark-mode-toggle
 */
const ThemeToggleButton = (props) => {
  const DarkModeContext = React.useContext(darkModeContext);
  const { darkMode, setDarkMode } = DarkModeContext;

  const handleThemeChange = () => {
    if (darkMode) {
      localStorage.setItem('preferred-theme', 'light');
      setDarkMode(false);
    } else {
      localStorage.setItem('preferred-theme', 'dark');
      setDarkMode(true);
    }
  };

  const properties = {
    dark: {
      r: 9,
      transform: 'rotate(40deg)',
      cx: 12,
      cy: 4,
      opacity: 0,
    },
    light: {
      r: 5,
      transform: 'rotate(90deg)',
      cx: 30,
      cy: 0,
      opacity: 1,
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };

  const { r, transform, cx, cy, opacity } =
    properties[darkMode ? 'dark' : 'light'];
  const svgContainerProps = useSpring({
    transform,
    config: properties.springConfig,
  });
  const centerCircleProps = useSpring({ r, config: properties.springConfig });
  const maskedCircleProps = useSpring({
    cx,
    cy,
    config: properties.springConfig,
  });
  const linesProps = useSpring({ opacity, config: properties.springConfig });

  return (
    <IconStyled onClick={handleThemeChange}>
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        style={{
          cursor: 'pointer',
          ...svgContainerProps,
        }}
      >
        <mask id="myMask2">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <animated.circle style={maskedCircleProps} r="9" fill="black" />
        </mask>

        <animated.circle
          cx="12"
          cy="12"
          style={centerCircleProps}
          fill="currentColor"
          mask="url(#myMask2)"
        />
        <animated.g stroke="currentColor" style={linesProps}>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </animated.g>
      </animated.svg>
    </IconStyled>
  );
};

export default ThemeToggleButton;
