import withPlugins from 'next-compose-plugins';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

const additionalConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withPlugins([], {
  ...nextConfig,
  ...additionalConfig,
});
