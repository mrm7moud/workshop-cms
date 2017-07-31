var fs = require('fs');
var querystring = require('querystring');

var ContentTypes = {
    css: 'text/css',
    js: 'application/javascript',
    jpg: 'image/jpg',
    ico: 'image/x-icon',
    png: 'image/png'
};

function handleHomeRoute(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    fs.readFile(__dirname + '/../public/index.html', function (error, file) {
        if (error) {
            console.log(error);
            return;
        }

        response.end(file);
    });

}

function handlePublic(request, response) {
    var endpoint = request.url;
    var parts = endpoint.split('.');

    // this line return 'main', 'css' and 'index', 'js'
    //console.log(parts[0]);
    var fileExtension = parts[parts.length - 1];
    //this line return only 'css' and 'js'
    //console.log(fileExtension);

    fs.readFile(__dirname + '/..' + endpoint, function (error, file) {
        if (error) {
            response.writeHead(500, {
                'Content-Type': 'text/html'
            });
            response.end('<h1>Internel Server Error</h1>');
        } else {
            response.writeHead(200, {
                'Content-Type': ContentTypes[fileExtension]
            });
            response.end(file);
        }
    });
}

function handleRedirect(request, response) {
    response.writeHead(302, {
        'Location': '/'
    })
    var allTheData = '';
    request.on('data', function (chunkOfData) {
        allTheData += chunkOfData;
    });
    request.on('end', function () {
        var convertedData = querystring.parse(allTheData).post;
        fs.readFile(__dirname + '/../src/posts.json', function (error, file) {
            if (error) {
                console.log(error);
                return;
            }

            var posts = JSON.parse(file);
            var time = Date.now();
            posts[time] = convertedData;
            var toJson = JSON.stringify(posts);

            fs.writeFile(__dirname + '/../src/posts.json', toJson, function (error, file) {
                if (error) {
                    console.log(error);
                    return;
                }

                response.end(file);
            });


        });
    });
}



function handlePost(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    fs.readFile(__dirname + '/../src/posts.json', function (error, file) {
        if (error) {
            console.log(error);
            return;
        }

        response.end(file);
    });
}

function handleNotFound(request, response) {
    response.writeHead(404, {
        'Content-Type': 'text/html'
    });
    response.end('<h1>Not Found</h1>');
}


module.exports = {
    handleHomeRoute: handleHomeRoute,
    handlePublic: handlePublic,
    handleNotFound: handleNotFound,
    handleRedirect: handleRedirect,
    handlePost: handlePost
};