/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@stripe/firestore-stripe-payments",
]); // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        // port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "rb.gy",
        // port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // port: "",
        pathname: "/**",
      },
    ],
  },
});
