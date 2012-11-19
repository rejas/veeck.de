var http = require('http'),
    rss = require('rss'),
    qs = require('querystring'),
    htmlparser = require('htmlparser');

/////////// Create and start the server to handle requests
http.createServer(function (request, response)
{
    if (request.url.indexOf('character') == -1) {
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end('Invalid call, please specify character\n');
    }
    else {
        //tell the client that return value is of rss type
        response.writeHead(200, {'Content-Type':'application/rss+xml'});

        //extract the searchquery from the querystring.. this is a REST service
        var str_querystring = request.url.substring(request.url.indexOf('character'));
        var character = qs.parse(str_querystring).character;
        var realm = 'khazgoroth';
        console.log('\nsearch char:' + qs.parse(str_querystring).character);

        //method call to process the search and print rss
        processquery(realm, character, response);
    }
}).listen(8080);

console.log('Server running at http://localhost:8080/');

function processquery(realm, character, responseObj)
{
    var options = {
        host:'eu.battle.net',
        path:'/api/wow/character/'+realm+'/'+character+'?fields=feed'
    };

    var handler = new htmlparser.DefaultHandler(function (error, dom) {
        if (error) {
        }
        else {
            ///////////// Generate RSS feed
            var feed = new rss({
                title:'RSS feed for '+character+' on '+realm,
                description:'RSS feed generated from blizzards json feed-api',
                feed_url:'http://'+options.host+options.path,
                site_url:'http://'+options.host+'/wow/character/'+realm+'/'+character+'/feed',
                author:'rejas'
            });

            // Parse JSON we get from blizzard
            var js = JSON.parse(dom[0].data);

            // Loop over data and add to feed
            js.feed.forEach(function (item) {
                feed.item({
                    description: 'todo desc',
                    title:item.type,
                    guid: 0,
                    date: item.timestamp,
                    author: 'todo author',
                    categories: [item.type],
                    url: 'todo url'
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

        var alldata = "";
        res.on('data', function (chunk) {
            alldata = alldata + chunk;
        });
        res.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });
        res.on('end', function () {
            html_parser.parseComplete(alldata);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
}