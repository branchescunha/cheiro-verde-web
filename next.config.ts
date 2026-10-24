import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.churrascariapaladar.com.br",
          },
        ],
        destination: "https://churrascariapaladar.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
