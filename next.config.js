/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/choice',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
