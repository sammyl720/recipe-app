// @ts-ignore
module.exports = {
  images: {
    domains: [
      'platform-lookaside.fbsbx.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com'
    ]
  },
  async headers() {
    const headers = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      }
    ]
    return [
      {
        source: '/(.*)',
        headers
      }
    ]
  }
};