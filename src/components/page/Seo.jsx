import * as React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { useTheme } from '@material-ui/core/styles';

const SEO = (props) => {
  const { description, lang, meta, title, thumbnail } = props;
  const siteMetadata = useSiteMetadata();
  const theme = useTheme();
  const metaDescription = description || siteMetadata.description;

  if (thumbnail) {
    let origin = '';
    if (typeof window !== 'undefined') {
      origin = window.location.origin;
    }
    meta.push({
      property: 'twitter:image`',
      content: origin + thumbnail && thumbnail.childImageSharp.sizes.src,
    });
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'theme-color',
          content: theme.palette.background.paper,
        },
      ].concat(meta)}
    >
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="author" href="/humans.txt" type="text/plain" />
    </Helmet>
  );
};

SEO.defaultProps = {
  description: '',
  lang: 'en',
  meta: [],
  thumbnail: null,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  thumbnail: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default SEO;
