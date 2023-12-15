import { useTheme } from '@mui/material/styles';
import { getSrc } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import * as React from 'react';

import { useSiteMetadata } from '../../hooks/use-site-metadata';

const MetaData = ({ description, title, thumbnail }) => {
  const siteMetadata = useSiteMetadata();
  const theme = useTheme();
  const metaDescription = description || siteMetadata.description;

  let images;
  if (thumbnail) {
    const imagePath = getSrc(thumbnail);
    let origin = '';
    if (typeof window !== 'undefined') {
      origin = window.location.origin;
    }
    images = (
      <>
        <meta name="og:image" content={origin + imagePath} />
        <meta name="twitter:image" content={origin + imagePath} />
      </>
    );
  }

  return (
    <>
      {/*Possible to export with Gatsby 5*/}
      {/*<html lang={lang}/>*/}
      {/*<body className="xxx"/>*/}
      <title>
        {title} | {siteMetadata.title}
      </title>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="author" href="/humans.txt" type="text/plain" />
      <meta name="description" content={metaDescription} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:type" content="website" />
      <meta name="theme-color" content={theme.palette.background.paper} />
      <meta name="twitter:card" content={'summary'} />
      <meta name="twitter:creator" content={siteMetadata.author} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:title" content={title} />
      {images}
    </>
  );
};

MetaData.defaultProps = {
  description: '',
  lang: 'en',
  thumbnail: null,
};

MetaData.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  thumbnail: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default MetaData;
