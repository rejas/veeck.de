const config = {
    autoprefixer: {
        "browsers": ["last 2 versions", "ie >=10", "iOS >=8", "Android >= 4.1"]
    },
    directories: {
        assemble: "./src/assemble",
        org: "./org",
        src: "./src",
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
    ports: {
        livereload: 35729,
        express: 4000
    },
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
