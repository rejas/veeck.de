var http = require('http'),
    rss = require('rss'),
    qs = require('querystring'),
    htmlparser = require("htmlparser");


/////////// Create and start the server to handle requests
http.createServer(function (request, response)
{
    if (request.url.indexOf('searchcp') == -1)
    {
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end('Invalid call\n');
    } else {
        //tell the client that return value is of rss type
        response.writeHead(200, {'Content-Type':'application/rss+xml'});

        //extract the searchquery from the querystring.. this is a REST service
        var str_querystring = request.url.substring(request.url.indexOf('searchcp'));
        var searchString = qs.parse(str_querystring).searchcp;
        console.log('\nsearch string:' + qs.parse(str_querystring).searchcp);

        //method call to process the search and print rss
        processquery(searchString, response);
    }
}).listen(8080);

console.log('Server running at http://localhost:8080/');

function processquery(searchString, responseObj)
{
    // code to get xml
    var options = {
        host:'eu.battle.net',
        port:80,
        path:'/api/wow/character/khazgoroth/frchorknabe?fields=feed',
        method:'GET'
    };

    var handler = new htmlparser.DefaultHandler(function (error, dom) {
        if (error) { }
        else
        {
            // Parse JSOn we get from blizz
            var js = JSON.parse(dom[0].data);

            //  Generate RSS feed
            var feed = new rss({
                title:'Codeproject search result Sample RSS Feed',
                description:'Code project search Results RSS feed through node.js sample',
                feed_url:'http://codeproject.com',
                site_url:'http://codeproject.com',
                author:'You'
            });

            // Loop over data and add to feed
            js.feed.forEach(function (item)
            {
                feed.item({
                    title:item.type,
                    url:'http://www.codeproject.com' + item.URL
                });
            });

            //Print the RSS feed out as response
            responseObj.write(feed.xml());
            responseObj.end();
        }
    });
    var html_parser = new htmlparser.Parser(handler);

    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');

        var alldata = "";
        res.on('data', function (chunk) {
            alldata = alldata + chunk;
        });
        res.on('end', function () {
            html_parser.parseComplete(alldata);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.write('data\n');
    req.end();
}

function print(value) {
    console.log('\n' + value);
}