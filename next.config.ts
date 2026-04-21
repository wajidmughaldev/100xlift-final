import type { NextConfig } from "next";

const mediaHostFromEnv = (() => {
  const apiUrl = process.env.WORDPRESS_API_URL;
  if (!apiUrl) return null;
  try {
    return new URL(apiUrl).hostname;
  } catch {
    return null;
  }
})();

const remoteHosts: string[] = Array.from(
  new Set(["cms.100xlift.com", mediaHostFromEnv].filter((host): host is string => Boolean(host)))
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: remoteHosts.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
