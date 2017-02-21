function getApiUrl() {
  if (process.env.ENVIRONMENT === 'production') {
    return 'https://pickaguide.fr:3000';
  } else if (process.env.ENVIRONMENT === 'staging') {
    return 'http://pickaguide.fr:3030';
  }

  return 'http://dev.l0cal:3030';
}

exports.config = {
  containerName: process.env.CONTAINER_NAME || 'container_frontWeb',
  environment: process.env.ENVIRONMENT || 'dev',
  apiUrl: process.env.API_URL || getApiUrl(),
};
