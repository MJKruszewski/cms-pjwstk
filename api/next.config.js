module.exports = {
  async headers () {
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*'
          },
          {
            key: 'Access-Control-Expose-Headers',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST, PATCH, GET, HEAD, OPTIONS, PUT, DELETE'
          }
        ]
      }
    ];
  }
};
