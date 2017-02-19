const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const logger = require('./server/system').System.Logger();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const sslOptions = {
  key: fs.readFileSync('/home/sslCertificates/privkey.pem'),
  cert: fs.readFileSync('/home/sslCertificates/cert.pem'),
  ca: fs.readFileSync('/home/sslCertificates/chain.pem')
};

app.use('/assets', express.static(path.resolve(__dirname, './assets')));

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/index.html`);
});

http.createServer(app).listen(PORT);
https.createServer(sslOptions, app).listen(443);
