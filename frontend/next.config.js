module.exports = {
  redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['admin.rtsprogram.com'],
  },
}
