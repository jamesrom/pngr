'use strict';
const LISTEN_PORT = process.env.PORT || 8081;
const WIDTH = process.env.VIEWPORT_WIDTH || 1920;
const HEIGHT = process.env.VIEWPORT_WIDTH || 1080;
const UPSTREAM_URL = process.env.UPSTREAM_URL || 'http://0.0.0.0';

const _ = require('lodash');
const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const nightmare = require('nightmare')({ show: false }).viewport(WIDTH, HEIGHT);

app.get('/favicon.ico', proxy(UPSTREAM_URL));

app.all('*', (req, res) => {
    var headers = _.omit(req.headers, 'accept', 'accept-encoding', 'user-agent');
    headers['method'] = req.method;
    nightmare
        .goto(UPSTREAM_URL + req.path, headers)
        .wait(1000)
        .screenshot()
        .end()
        .then(png => {
            res.set('Content-Type', 'image/png');
            res.send(png);
        });
})

app.listen(LISTEN_PORT);
console.log(`pngr running on port ${LISTEN_PORT}`);