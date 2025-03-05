import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    REACT_APP_STRAPI_API_URL: process.env.REACT_APP_STRAPI_API_URL,
    REACT_APP_STRAPI_URL: process.env.REACT_APP_STRAPI_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  outputFileTracingIncludes: {
    '/**/*': ['./messages/**/*'],
  },
};

export default withNextIntl(nextConfig);
