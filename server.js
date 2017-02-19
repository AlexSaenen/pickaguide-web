const http = require('http');
const https = require('https');
const express = require('express');
const logger = require('./server/system').System.Logger();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/assets', express.static(path.resolve(__dirname, './assets')));

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/index.html`);
});

http.createServer(app).listen(PORT);
// https.createServer(sslOptions, app).listen(443);

// app.listen(PORT, () => {
//     logger.info(`Server is up and running on port: ${PORT}`);
// });
