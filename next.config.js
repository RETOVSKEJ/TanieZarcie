/** @type {import('next').NextConfig} */

// const dns = require("dns")
// dns.setDefaultResultOrder("ipv4first")

const securityHeaders = [
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "origin-when-cross-origin",
    },
]

const nextConfig = {
    experimental: {
        appDir: true,
    },
    env: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: "/:path*",
                headers: securityHeaders,
            },
        ]
    },
}

module.exports = nextConfig

// FLOW:

// 1.	headers from next.config.js
// 2.	redirects from next.config.js
// 3.	Middleware (rewrites, redirects, etc.)
// 4.	beforeFiles (rewrites) from next.config.js
// 5.	Filesystem routes (public/, _next/static/, Pages, etc.)
// 6.	afterFiles (rewrites) from next.config.js
// 7.	Dynamic Routes (/blog/[slug])
// 8.	fallback (rewrites) from next.config.js
