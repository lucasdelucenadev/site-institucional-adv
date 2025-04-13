/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uploads.metroimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'p2.trrsf.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.terra.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wm.observador.pt',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.conjur.com.br',
        port: '',
        pathname: '/**',
      }
    ],
    domains: ['placehold.co', 'uploads.metroimg.com', 'p2.trrsf.com', 'images.terra.com', 'wm.observador.pt', 'www.conjur.com.br'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

module.exports = nextConfig 