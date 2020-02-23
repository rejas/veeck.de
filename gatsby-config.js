module.exports = {
  siteMetadata: {
    title: 'Veeck',
    description: 'My private homepage',
    siteUrl: 'https://veeck.de',
    author: '@rejas',
    menuLinks: [
      {
        name: 'projects',
        url: '/projects',
        icon: 'computer',
      },
      {
        name: 'travels',
        url: '/travels',
        icon: 'travels',
      },
      {
        name: 'photos',
        url: '/photos',
        icon: 'camera',
      },
      {
        name: 'blog',
        url: '/blog',
        icon: 'pencil',
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
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/content/images`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-transformer-yaml`,
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
              markdownCaptions: true,
              showCaptions: true,
              withWebp: true,
            },
          },
        ],
        plugins: ['gatsby-remark-images'],
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
                family: 'Kanit',
                variants: ['400', '700'],
                fontDisplay: 'swap',
              },
              {
                family: 'Lato',
                variants: ['300', '400', '500'],
                //subsets: ['latin']
                //text: 'Hello'
                fontDisplay: 'swap',
                //strategy: 'selfHosted' // 'base64' || 'cdn'
              },
              {
                family: 'Shadows+Into+Light',
                fontDisplay: 'swap',
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
