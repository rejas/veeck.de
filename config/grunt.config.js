const config = {
    connect: {
        hostname: "localhost",
        livereload: true,
        port: 9000
    },
    directories: {
        assemble: "./src/assemble",
        org: "./org",
        src: "./src",
        tmp: "./tmp",
        dist: "./dist"
    },
    ftp: {
        host: "www.veeck.de",
        user: "www.veeck.de",
        remotePath: "."
    },
    imagemin: {
        progressive: true
    },
    htmlmin: {
        collapseWhitespace: true,
        removeComments: true
    },
    modernizr: [
        "prefixes",
        "prefixed",
        "setClasses"
    ],
    release: {
        pkgFiles: ['package.json'],
        commitMessage: 'Release %s',
        tagName: '%s',
        tagAnnotation: 'Release %s',
        buildCommand: false
    },
    sitemap: {
        fileName: "sitemap.xml",
        newLine: "\n",
        changefreq: "daily",
        priority: "0.5",
        siteUrl: "http://veeck.de",
        spacing: "    "
    }
};

module.exports = config;
