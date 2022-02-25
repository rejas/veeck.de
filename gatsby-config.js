module.exports = {
  siteMetadata: {
    title: 'Veeck',
    description: 'Veecks private homepage',
    siteUrl: 'https://veeck.de',
    author: '@rejas',
    menuLinks: [
      {
        name: 'blog',
        url: '/blog',
        icon: 'blog',
      },
      {
        name: 'projects',
        url: '/projects',
        icon: 'projects',
      },
      {
        name: 'photos',
        url: '/photos',
        icon: 'photos',
      },
      {
        name: 'travels',
        url: '/travels',
        icon: 'travels',
      },
      /*
      {
        name: 'links',
        url: '/links',
        icon: 'link',
      },
        */
    ],
  },
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'mdx',
        path: `${__dirname}/content/mdx`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'yaml',
        path: `${__dirname}/content/yaml`,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.first_published,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            title: 'Veeck`s Latest Stuff',
            output: '/rss.xml',
            query: `
              {
                allMdx(
                  sort: {order: DESC, fields: [frontmatter___first_published]}
                ) {
                  edges {
                    node {
                      id
                      excerpt
                      frontmatter {
                        title
                        first_published
                      }
                      fields {
                        slug
                      }
                    }
                  }
                }
              }
            `,
          },
        ],
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'veeck.de',
        short_name: 'veeck',
        start_url: '/',
        background_color: '#4bb2f9',
        display: 'standalone',
        icon: `${__dirname}/content/images/favicon.png`,
        theme_color_in_head: false,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve(
            `${__dirname}/src/components/layout/layout.jsx`
          ),
        },
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
              maxWidth: 800,
              wrapperStyle: 'margin: 2rem 0;',
              showCaptions: true,
              withWebp: true,
            },
          },
        ],
        plugins: ['gatsby-remark-images'],
        remarkPlugins: [require('remark-unwrap-images')],
      },
    },
    'gatsby-plugin-no-sourcemaps',
    // This (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: '/radio' }],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-theme-material-ui',
      options: {
        stylesConfig: {
          // disableAutoprefixing: true,
          // disableMinification: true
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
  ],
};
