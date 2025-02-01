import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          title
          description
          author
          menuLinks {
            name
            url
            icon
          }
        }
      }
    }
  `);
  return site.siteMetadata;
};
