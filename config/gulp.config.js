const config = {
    directories: {
        assemble: './src/assemble',
        config: './config',
        node: './node_modules',
        org: './org',
        src: './src',
        tmp: './tmp',
        dist: './dist'
    },
    ftp: {
        host: 'www.veeck.de',
        user: 'www.veeck.de',
        remotePath: '.'
    },
    htmlmin: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true
    },
    modernizr: [
        'prefixes',
        'prefixed',
        'setClasses'
    ],
    sitemap: {
        fileName: 'sitemap.xml',
        newLine: '\n',
        changefreq: 'daily',
        priority: '0.5',
        siteUrl: 'https://veeck.de',
        spacing: '    '
    }
};

module.exports = config;
