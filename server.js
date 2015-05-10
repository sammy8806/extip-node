/**
 * Created by steven on 20.11.13.
 */

var http = require('http');
var url = require('url');
var querystring = require('querystring');
var dataProvider = require('./dataProvider');

function start(config) {
    function onRequest(request, response) {
        var query = querystring.unescape(url.parse(request.url).query);

        console.log("[DEBUG][server.js::start] Request received.");

        response.writeHead(200, {"Content-Type": "text/plain"});

        var data = dataProvider.get(request);

        var dataType = request.url.substr(1).split('.');
        if (dataType[0] != '') {
            console.log("##" + dataType);
            data = dataProvider.formatData(dataType[1] || "plain", data);
        }

        response.write(String(data));
        response.end();
    }

    console.log("[DEBUG][server.js::start] Initialing Server.");

    try {
        http.createServer(onRequest).listen(config.port, config.host);
        console.log("[DEBUG][server.js::start] Server has started.");
    } catch (Error) {
        console.log("[ERROR][server.js::start] Server cannot be started. Is another Instance already running? [" + Error.message + "]");
        return -1;
    }

    return 0;
}

exports.start = start;