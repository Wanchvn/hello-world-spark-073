// Deployment Configuration
export const deployConfig = {
  production: {
    NODE_ENV: 'production',
    PORT: process.env.PORT || 5000,
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://your-frontend-domain.com',
    CORS_ORIGIN: process.env.FRONTEND_URL || 'https://your-frontend-domain.com'
  },
  staging: {
    NODE_ENV: 'staging',
    PORT: process.env.PORT || 5000,
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://staging.your-domain.com',
    CORS_ORIGIN: process.env.FRONTEND_URL || 'https://staging.your-domain.com'
  },
  development: {
    NODE_ENV: 'development',
    PORT: process.env.PORT || 5000,
    FRONTEND_URL: 'http://localhost:5173',
    CORS_ORIGIN: 'http://localhost:5173'
  }
};

// Get current environment
export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return deployConfig[env] || deployConfig.development;
};
