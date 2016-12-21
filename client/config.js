function getApiUrl() {
    console.log('ENVIRONMENT ', process.env.ENVIRONMENT);
    if (process.env.ENVIRONMENT === 'production') {
        return 'http://82.223.82.41:3000';
    } else if (process.env.ENVIRONMENT === 'staging') {
        return 'http://82.223.82.41:3030';
    }

    return 'http://dev.l0cal:3030';
}

exports.config = {
    containerName: process.env.CONTAINER_NAME || 'container_frontWeb',
    environment: process.env.ENVIRONMENT || 'dev',
    apiUrl: process.env.API_URL || getApiUrl(),
};
