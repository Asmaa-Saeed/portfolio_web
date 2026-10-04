import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the root so a stray lockfile in a parent folder is never picked up.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
