var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var ContentTypes = {
    css: 'text/css',
    js: 'application/javascript',
    jpg: 'image/jpg',
    ico: 'image/x-icon',
    png: 'image/png'
};

var message = 'I am so happy to be part of the Node Girls workshop!';

function handler(request, response) {
    var endpoint = request.url;
    var method = request.method;
    //console.log(method);

    if (endpoint === '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});

        fs.readFile(__dirname + '/../public/index.html', function (error, file) {
            if (error) {
                console.log(error);
                return;
            }

            response.end(file);
        });

    } else if (endpoint === '/node') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(message); //response body
        response.end(); // finish response
    } else if (endpoint === '/girls') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(message); //response body
        response.end(); // finish response
    } else if(endpoint === '/create-post'){
        response.writeHead(302,{'Location': '/'})
        var allTheData = '';
        request.on('data', function (chunkOfData) {
            allTheData += chunkOfData;
        });
        request.on('end', function () {
            var convertedData = querystring.parse(allTheData);
            console.log(convertedData);
            response.end();
        });

    }else {
        //var url = request.url;
        var parts = endpoint.split('.'); 
        // this line return 'main', 'css' and 'index', 'js'
        //console.log(parts[0]);
        var fileExtension = parts[parts.length - 1]; 
        //this line return only 'css' and 'js'
        //console.log(fileExtension);

        fs.readFile(__dirname + '/../public' + endpoint, function (error, file) {
            if (error) {
                response.writeHead(500, {'Content-Type': 'text/html'});
                response.end('<h1>Internel Server Error</h1>');
            } else {
                response.writeHead(200, {'Content-Type': ContentTypes[fileExtension]});
                response.end(file);
            }
        });
    }

}

var server = http.createServer(handler);

server.listen(3000, function () {
    console.log("Server is listening on port 3000.  Ready to accept requests!");
});