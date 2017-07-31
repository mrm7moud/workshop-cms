var http = require('http');
var querystring = require('querystring');
var handlers = require('./handler.js');

var message = 'I am so happy to be part of the Node Girls workshop!';

function handler(request, response) {

    var endpoint = request.url;
    console.log(endpoint);
    //var method = request.method;
    //console.log(method);

    if (endpoint === '/') {
        handlers.handleHomeRoute(request, response);
    } else if (endpoint === '/create/post') {
        handlers.handleRedirect(request, response);
    } else if (endpoint.startsWith('/public')) {
        handlers.handlePublic(request, response);
    } else if (endpoint === '/posts') {
        handlers.handlePost(request, response);
    } else if (endpoint === '/create/post') {
        handlers.handleGetPost(request, response);
    } else {
        handlers.handleNotFound(request, response);
    }

}

var server = http.createServer(handler);

server.listen(3000, function () {
    console.log("Server is listening on port 3000.  Ready to accept requests!");
});