module.exports = {
  siteMetadata: {
    title: 'Veeck',
    description: 'My private homepage',
    author: '@rejas',
    menuLinks: [
      {
        name: 'tech',
        url: '/projects',
      },
      {
        name: 'travel',
        url: '/travel',
      },
      {
        name: 'photos',
        url: '/photos',
      },
      {
        name: 'links',
        url: '/links',
      },
      {
        name: 'blog',
        url: '/blog',
      },
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
      resolve: `gatsby-source-filesystem`,
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
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Roboto',
              //variants: ['300', '400', '500'],
              //subsets: ['latin']
              //text: 'Hello'
              fontDisplay: 'swap',
              //strategy: 'selfHosted' // 'base64' || 'cdn'
            },
            {
              family: 'Girassol',
              fontDisplay: 'swap',
            },
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'veeck.de',
        short_name: 'veeck',
        start_url: '/',
        background_color: '#249946',
        theme_color: '#246341',
        display: 'minimal-ui',
        icon: `${__dirname}/content/images/favicon.png`,
      },
    },
    'gatsby-plugin-react-helmet',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
