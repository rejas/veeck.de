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
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/content/images`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
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
        name: 'mdx',
        path: `${__dirname}/content/mdx`,
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve(
            `${__dirname}/src/components/page/Layout.jsx`
          ),
        },
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
              showCaptions: true,
              withWebp: true,
            },
          },
        ],
        plugins: ['gatsby-remark-images'],
        remarkPlugins: [require('remark-unwrap-images')],
      },
    },
    {
      resolve: 'gatsby-theme-material-ui',
      options: {
        stylesConfig: {
          // disableAutoprefixing: true,
          // disableMinification: true
        },
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: 'Josefin+Slab',
                variants: ['400', '700'],
                fontDisplay: 'swap',
              },
              {
                family: 'Josefin+Sans',
                variants: ['300', '400', '500'],
                //subsets: ['latin']
                //text: 'Hello'
                fontDisplay: 'swap',
                //strategy: 'selfHosted' // 'base64' || 'cdn'
              },
            ],
          },
        },
      },
    },
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
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: '/radio' }],
      },
    },
    'gatsby-plugin-sitemap',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
