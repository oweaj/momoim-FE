const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  images: {
    domains: ["i.ibb.co", "momoim-prod-bucket.s3.ap-northeast-2.amazonaws.com"],
  },

  async redirects() {
    return [
      {
        source: "/mypage",
        destination: "/mypage/schedules",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
