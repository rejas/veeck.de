import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            description
            author
            menuLinks {
              name
              url
            }
          }
        }
      }
    `
  );
  return site.siteMetadata;
};
