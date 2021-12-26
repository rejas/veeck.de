import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import BackgroundImage from 'gatsby-background-image';
import { getImage } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';
import Headlines from '../page/Headlines';
import BasicLayout from './BasicLayout';

const HeroStyled = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '50vh',
}));

const BackgroundImageStyled = styled(BackgroundImage)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  height: '100%',
}));

const NoImageChildrenStyled = styled('div')(({ theme }) => ({
  marginTop: '5vh',
}));

const ImageChildrenStyled = styled('div')(({ theme }) => ({
  marginTop: '50vh',
}));

const HeroLayout = (props) => {
  const { children, image, lead, title } = props;

  let bgImage;
  if (image) {
    bgImage = convertToBgImage(getImage(image));
  }

  return (
    <BasicLayout maxWidth="sm">
      <React.Fragment>
        {bgImage && (
          <React.Fragment>
            <HeroStyled>
              <BackgroundImageStyled {...bgImage} preserveStackingContext>
                <Headlines title={title} lead={lead} />
              </BackgroundImageStyled>
            </HeroStyled>
            <ImageChildrenStyled>{children}</ImageChildrenStyled>
          </React.Fragment>
        )}
        {!bgImage && (
          <React.Fragment>
            <Headlines title={title} lead={lead} />
            <NoImageChildrenStyled>{children}</NoImageChildrenStyled>
          </React.Fragment>
        )}
      </React.Fragment>
    </BasicLayout>
  );
};

HeroLayout.defaultProps = {
  image: null,
  title: null,
  lead: null,
};

HeroLayout.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.object,
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default HeroLayout;
