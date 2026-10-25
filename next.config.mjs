/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // builds a static site in the "out" folder for GitHub Pages
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;