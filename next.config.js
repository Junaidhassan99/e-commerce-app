/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/buyer',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
