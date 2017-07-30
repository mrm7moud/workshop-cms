var http = require('http');
var fs = require('fs');

var message = 'I am so happy to be part of the Node Girls workshop!';

function handler(request, response) {
    var endpoint = request.url;
    var method = request.method;
    //console.log(method);

    if (endpoint === '/') {
        response.writeHead(200, { "Content-Type": "text/html" });

        fs.readFile(__dirname + '/../public/index.html', function (error, file) {
            if (error) {
                console.log(error);
                return;
            }

            response.end(file);
        });

    } else if (endpoint === '/node') {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(message); //response body
        response.end(); // finish response
    } else if (endpoint === '/girls') {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(message); //response body
        response.end(); // finish response
    } else {

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('not found '); //response body
        response.end(); // finish response


    }

}

var server = http.createServer(handler);

server.listen(3000, function () {
    console.log("Server is listening on port 3000.  Ready to accept requests!");
});