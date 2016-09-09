function getApiUrl() {
    if (process.env.API_URL) {
        return process.env.API_URL;
    } else if (process.env.ENVIRONMENT === 'production') {
        return 'dev.l0cal:4242/api';
    }

    if (process.env.NODE_ENV === 'production') {
        return 'http://146.148.19.240:8080/api';
    }

    return 'http://localhost:4242/api';
}

exports.config = {
    containerName: process.env.CONTAINER_NAME || 'container_frontWeb',
    environment: process.env.ENVIRONMENT || 'dev',
    apiUrl: process.env.DATABASE_URL || getApiUrl(),
};
