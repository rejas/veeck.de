import { css, styled } from '@mui/material/styles';
import BackgroundImage from 'gatsby-background-image';
import { Link } from 'gatsby-theme-material-ui';
import * as React from 'react';

import { useSiteMetadata } from '../../hooks/use-site-metadata';
import CategoryIcon from '../icons/CategoryIcon';
import MenuItem from './MenuItem';

const ToolbarStyled = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const IconStyled = styled('div')(css`
  align-self: center;
  width: 150px;
`);

const HeadlineIconStyled = styled('h1')(({ theme }) => ({
  alignSelf: 'flex-end',
  textAlign: 'center',
}));

const HeadlineStyled = styled('h1')(({ theme }) => ({
  alignSelf: 'flex-end',
  textAlign: 'right',
}));

const LeadinStyled = styled('h2')(({ theme }) => ({
  alignSelf: 'flex-end',
  textAlign: 'right',
}));

const BackgroundImageStyled = styled(BackgroundImage)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  height: '100%',
  padding: '3rem',
  backgroundSize: 'cover',

  '&::before, &::after': {
    filter: 'opacity(0.35)',
  },
}));

const BackgroundStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  padding: '3rem',
  alignItems: 'flex-start',
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary,
  },
}));

const MenuStyled = styled('div')(css``);

const ConditionalWrapper = ({
  condition,
  wrapperTrue,
  wrapperFalse,
  children,
}) => (condition ? wrapperTrue(children) : wrapperFalse(children));

const HeaderNew = (props) => {
  const { lead, bgImage, icon } = props;
  const { menuLinks } = useSiteMetadata();

  return (
    <ToolbarStyled component="nav" variant="dense">
      <ConditionalWrapper
        condition={bgImage}
        wrapperTrue={(children) => (
          <BackgroundImageStyled {...bgImage} preserveStackingContext>
            {children}
          </BackgroundImageStyled>
        )}
        wrapperFalse={(children) => (
          <BackgroundStyled>{children}</BackgroundStyled>
        )}
      >
        <LinkStyled noWrap key="home" to="/">
          <CategoryIcon category="home" color="primary" />
        </LinkStyled>
        {icon && (
          <HeadlineIconStyled>
            <IconStyled>{icon}</IconStyled>
            {props.title}
          </HeadlineIconStyled>
        )}

        {!icon && <HeadlineStyled>{props.title}</HeadlineStyled>}

        <LeadinStyled>{lead}</LeadinStyled>
        <MenuStyled>
          {menuLinks.map((link, index) => (
            <MenuItem link={link} key={index} />
          ))}
        </MenuStyled>
      </ConditionalWrapper>
    </ToolbarStyled>
  );
};

export default HeaderNew;
