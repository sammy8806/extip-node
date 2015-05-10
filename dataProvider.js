function objToString(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ': ' + obj[p] + '\n';
        }
    }
    return str;
}

function getClientData(request) {
    var data = {
        header: request.headers,
        url: request.url,
        data: {
            ip: request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress,
            host: request.headers["host"].split(':')[0],
            port: request.headers["host"].split(':')[1],
            ua: request.headers["user-agent"],
            lang: request.headers["accept-language"],
            // keepalive: request.headers["user-agent"],
            encoding: request.headers["accept-encoding"],
            mime: request.headers["accept"],
            connection: request.headers["connection"],
            cache: request.headers["cache-control"],
            forwarded: request.headers["x-forwarded-for"]
        }
    };

    for (var i in data.data)
        if (data.data.hasOwnProperty(i))
            data.data[i] = (data.data[i] == undefined ? "" : data.data[i]);

    return data;
}

var json2xml = require('./json2xml');

exports.get = function (_req) {
    var _cD = getClientData(_req);
    var requestedData = _cD.url.substr(1).split('.');
    // console.log(_cD);
    // console.log(requestedData);

    if (requestedData[0] == '') {
        return 'Render Page here!';
    } else {
        var dataType = requestedData[0];
        if (dataType == 'all') {
            return _cD.data;
        }

        if (_cD.data.hasOwnProperty(dataType))
            return _cD.data[dataType];

        return "FALSE";
    }
};

exports.formatData = function (_format, _data) {
    console.log(_format);

    if (_format == "plain")
        return objToString(_data);

    if (_format == "json")
        return JSON.stringify(_data);

    if (_format == "xml")
        return json2xml.json2xml({info: _data});
};
