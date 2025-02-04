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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-momoim-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "**",
      },
    ],
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
